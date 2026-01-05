import diagnosticQuestionsData from "@/data/diagnostic-questions.json";
import diagnosticQuestionsLightData from "@/data/diagnostic-questions-light.json";
import leversData from "@/data/levers.json";
import type { Pillar, MaturityLevel, ValueLever } from "@/types";

export type DiagnosticMode = "light" | "comprehensive";

export interface DiagnosticQuestion {
  id: string;
  question: string;
  helpText: string;
  options: {
    label: string;
    value: number;
    description: string;
  }[];
  pillarWeight: number;
}

export interface DiagnosticAnswer {
  questionId: string;
  value: number;
}

export interface PillarScore {
  pillar: Pillar;
  score: number; // 0-100 percentage
  maturityLevel: MaturityLevel;
  answeredQuestions: number;
  totalQuestions: number;
}

export interface DiagnosticResult {
  mode: DiagnosticMode;
  answers: DiagnosticAnswer[];
  pillarScores: PillarScore[];
  overallScore: number;
  recommendedLevers: ValueLever[];
  completedAt: string;
}

/**
 * Get all diagnostic questions based on mode
 */
export function getAllQuestions(mode: DiagnosticMode = "comprehensive"): Map<Pillar, DiagnosticQuestion[]> {
  const questionMap = new Map<Pillar, DiagnosticQuestion[]>();
  const dataSource = mode === "light" ? diagnosticQuestionsLightData : diagnosticQuestionsData;

  const pillars: Pillar[] = ["cost", "service", "efficiency", "compliance"];

  pillars.forEach((pillar) => {
    const pillarData = dataSource.pillars[pillar];
    if (pillarData && pillarData.questions) {
      questionMap.set(pillar, pillarData.questions as DiagnosticQuestion[]);
    }
  });

  return questionMap;
}

/**
 * Get questions for a specific pillar based on mode
 */
export function getQuestionsByPillar(pillar: Pillar, mode: DiagnosticMode = "comprehensive"): DiagnosticQuestion[] {
  const dataSource = mode === "light" ? diagnosticQuestionsLightData : diagnosticQuestionsData;
  const pillarData = dataSource.pillars[pillar];
  return (pillarData?.questions || []) as DiagnosticQuestion[];
}

/**
 * Calculate pillar score from answers
 * Score is percentage: (sum of answer values) / (max possible score) * 100
 */
export function calculatePillarScore(
  pillar: Pillar,
  answers: DiagnosticAnswer[],
  mode: DiagnosticMode = "comprehensive"
): number {
  const questions = getQuestionsByPillar(pillar, mode);

  if (questions.length === 0) return 0;

  const questionIds = questions.map((q) => q.id);
  const relevantAnswers = answers.filter((a) => questionIds.includes(a.questionId));

  if (relevantAnswers.length === 0) return 0;

  const totalScore = relevantAnswers.reduce((sum, answer) => sum + answer.value, 0);
  const maxPossibleScore = relevantAnswers.length * 2; // Each question max score is 2

  const percentage = (totalScore / maxPossibleScore) * 100;

  return Math.round(percentage);
}

/**
 * Determine maturity level based on percentage score
 * Level 1: 0-33%
 * Level 2: 34-66%
 * Level 3: 67-89%
 * Level 4: 90-100%
 */
export function calculateLadderLevel(scorePercentage: number): MaturityLevel {
  if (scorePercentage <= 33) return 1;
  if (scorePercentage <= 66) return 2;
  if (scorePercentage <= 89) return 3;
  return 4;
}

/**
 * Get pillar scores from all answers
 */
export function getPillarScores(answers: DiagnosticAnswer[], mode: DiagnosticMode = "comprehensive"): PillarScore[] {
  const pillars: Pillar[] = ["cost", "service", "efficiency", "compliance"];

  return pillars.map((pillar) => {
    const questions = getQuestionsByPillar(pillar, mode);
    const score = calculatePillarScore(pillar, answers, mode);
    const maturityLevel = calculateLadderLevel(score);

    const questionIds = questions.map((q) => q.id);
    const answeredQuestions = answers.filter((a) => questionIds.includes(a.questionId)).length;

    return {
      pillar,
      score,
      maturityLevel,
      answeredQuestions,
      totalQuestions: questions.length,
    };
  });
}

/**
 * Calculate overall score (average across pillars)
 */
export function calculateOverallScore(pillarScores: PillarScore[]): number {
  if (pillarScores.length === 0) return 0;

  const totalScore = pillarScores.reduce((sum, ps) => sum + ps.score, 0);
  return Math.round(totalScore / pillarScores.length);
}

/**
 * Recommend levers based on diagnostic results
 * Logic:
 * - For each pillar at Level 1 or 2, recommend foundational levers (maturityLevel 1-2)
 * - Prioritize levers with green readiness
 * - Return top 5-7 levers across all pillars
 */
export function recommendLevers(pillarScores: PillarScore[]): ValueLever[] {
  const allLevers = leversData as ValueLever[];

  // Identify weak pillars (Level 1 or 2)
  const weakPillars = pillarScores
    .filter((ps) => ps.maturityLevel <= 2)
    .map((ps) => ps.pillar);

  // Find levers that:
  // 1. Target weak pillars
  // 2. Are foundational or core (maturityLevel 1-2)
  // 3. Have good readiness (at least 1 green axis)
  const candidateLevers = allLevers.filter((lever) => {
    const targetsWeakPillar = lever.pillars.some((p) => weakPillars.includes(p as Pillar));
    const isFoundational = lever.maturityLevel <= 2;
    const hasGreenReadiness =
      lever.readiness.data === "green" ||
      lever.readiness.process === "green" ||
      lever.readiness.technology === "green";

    return targetsWeakPillar && isFoundational && hasGreenReadiness;
  });

  // Score levers by:
  // - Number of weak pillars they address (higher is better)
  // - Readiness (more greens is better)
  // - Maturity level (lower is better for quick wins)
  const scoredLevers = candidateLevers.map((lever) => {
    const weakPillarCount = lever.pillars.filter((p) => weakPillars.includes(p as Pillar)).length;
    const greenCount =
      (lever.readiness.data === "green" ? 1 : 0) +
      (lever.readiness.process === "green" ? 1 : 0) +
      (lever.readiness.technology === "green" ? 1 : 0);
    const maturityScore = 3 - lever.maturityLevel; // Lower maturity = higher score

    const totalScore = weakPillarCount * 10 + greenCount * 3 + maturityScore;

    return { lever, score: totalScore };
  });

  // Sort by score and return top 5-7
  scoredLevers.sort((a, b) => b.score - a.score);

  return scoredLevers.slice(0, 7).map((sl) => sl.lever);
}

/**
 * Generate complete diagnostic result
 */
export function generateDiagnosticResult(answers: DiagnosticAnswer[], mode: DiagnosticMode = "comprehensive"): DiagnosticResult {
  const pillarScores = getPillarScores(answers, mode);
  const overallScore = calculateOverallScore(pillarScores);
  const recommendedLevers = recommendLevers(pillarScores);

  return {
    mode,
    answers,
    pillarScores,
    overallScore,
    recommendedLevers,
    completedAt: new Date().toISOString(),
  };
}

/**
 * Get diagnostic summary text based on pillar score
 */
export function getPillarSummary(pillar: Pillar, score: PillarScore): string {
  const pillarNames = {
    cost: "Cost & Productivity",
    service: "Service & Experience",
    efficiency: "Efficiency & Throughput",
    compliance: "Risk & Compliance",
  };

  const levelDescriptions: Record<MaturityLevel, string> = {
    1: "foundational stage with limited visibility and manual processes",
    2: "core optimization stage with some digital tools and systematic processes",
    3: "advanced stage with proactive management and analytics",
    4: "strategic stage with network-level optimization and predictive capabilities",
  };

  const pillarName = pillarNames[pillar];
  const levelDesc = levelDescriptions[score.maturityLevel];

  return `On ${pillarName} you are at **Level ${score.maturityLevel}** (${score.score}% score): ${levelDesc}.`;
}

/**
 * Validate answers (ensure all questions have answers)
 */
export function validateAnswers(answers: DiagnosticAnswer[], mode: DiagnosticMode = "comprehensive"): {
  isValid: boolean;
  missingQuestions: string[];
} {
  const allQuestionsMap = getAllQuestions(mode);
  const allQuestionIds: string[] = [];

  allQuestionsMap.forEach((questions) => {
    questions.forEach((q) => allQuestionIds.push(q.id));
  });

  const answeredQuestionIds = answers.map((a) => a.questionId);
  const missingQuestions = allQuestionIds.filter((id) => !answeredQuestionIds.includes(id));

  return {
    isValid: missingQuestions.length === 0,
    missingQuestions,
  };
}

/**
 * Save diagnostic result to localStorage
 */
export function saveDiagnosticResult(result: DiagnosticResult): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("fretron_diagnostic_result", JSON.stringify(result));
}

/**
 * Load diagnostic result from localStorage
 */
export function loadDiagnosticResult(): DiagnosticResult | null {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("fretron_diagnostic_result");
  if (!saved) return null;

  try {
    return JSON.parse(saved) as DiagnosticResult;
  } catch (error) {
    console.error("Failed to parse diagnostic result:", error);
    return null;
  }
}

/**
 * Clear diagnostic result from localStorage
 */
export function clearDiagnosticResult(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("fretron_diagnostic_result");
}
