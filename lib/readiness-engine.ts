import readinessQuestionsData from "@/data/readiness-questions.json";

export type ReadinessDimension = "data" | "process" | "technology";
export type ReadinessScore = "red" | "amber" | "green";

export interface ReadinessQuestion {
  id: string;
  question: string;
  helpText: string;
  dimension: ReadinessDimension;
  options: {
    label: string;
    value: number;
    score: ReadinessScore;
    description: string;
  }[];
}

export interface ReadinessAnswer {
  questionId: string;
  value: number;
  score: ReadinessScore;
}

export interface DimensionReadiness {
  dimension: ReadinessDimension;
  score: ReadinessScore;
  percentage: number;
  answeredQuestions: number;
  totalQuestions: number;
  redCount: number;
  amberCount: number;
  greenCount: number;
}

export interface ReadinessResult {
  answers: ReadinessAnswer[];
  dimensionReadiness: DimensionReadiness[];
  overallReadiness: ReadinessScore;
  completedAt: string;
}

/**
 * Get all readiness questions
 */
export function getAllReadinessQuestions(): Map<ReadinessDimension, ReadinessQuestion[]> {
  const questionMap = new Map<ReadinessDimension, ReadinessQuestion[]>();

  const dimensions: ReadinessDimension[] = ["data", "process", "technology"];

  dimensions.forEach((dimension) => {
    const dimensionData = readinessQuestionsData.dimensions[dimension];
    if (dimensionData && dimensionData.questions) {
      questionMap.set(dimension, dimensionData.questions as ReadinessQuestion[]);
    }
  });

  return questionMap;
}

/**
 * Get questions for a specific dimension
 */
export function getQuestionsByDimension(dimension: ReadinessDimension): ReadinessQuestion[] {
  const dimensionData = readinessQuestionsData.dimensions[dimension];
  return (dimensionData?.questions || []) as ReadinessQuestion[];
}

/**
 * Calculate dimension readiness from answers
 * Red: 0-33% green answers
 * Amber: 34-66% green answers
 * Green: 67-100% green answers
 */
export function calculateDimensionReadiness(
  dimension: ReadinessDimension,
  answers: ReadinessAnswer[]
): DimensionReadiness {
  const questions = getQuestionsByDimension(dimension);

  if (questions.length === 0) {
    return {
      dimension,
      score: "red",
      percentage: 0,
      answeredQuestions: 0,
      totalQuestions: 0,
      redCount: 0,
      amberCount: 0,
      greenCount: 0,
    };
  }

  const questionIds = questions.map((q) => q.id);
  const relevantAnswers = answers.filter((a) => questionIds.includes(a.questionId));

  if (relevantAnswers.length === 0) {
    return {
      dimension,
      score: "red",
      percentage: 0,
      answeredQuestions: 0,
      totalQuestions: questions.length,
      redCount: 0,
      amberCount: 0,
      greenCount: 0,
    };
  }

  // Count scores
  const redCount = relevantAnswers.filter((a) => a.score === "red").length;
  const amberCount = relevantAnswers.filter((a) => a.score === "amber").length;
  const greenCount = relevantAnswers.filter((a) => a.score === "green").length;

  // Calculate percentage of green answers
  const greenPercentage = (greenCount / relevantAnswers.length) * 100;

  // Determine overall score
  let overallScore: ReadinessScore = "red";
  if (greenPercentage >= 67) {
    overallScore = "green";
  } else if (greenPercentage >= 34) {
    overallScore = "amber";
  }

  return {
    dimension,
    score: overallScore,
    percentage: Math.round(greenPercentage),
    answeredQuestions: relevantAnswers.length,
    totalQuestions: questions.length,
    redCount,
    amberCount,
    greenCount,
  };
}

/**
 * Get dimension readiness for all dimensions
 */
export function getDimensionReadiness(answers: ReadinessAnswer[]): DimensionReadiness[] {
  const dimensions: ReadinessDimension[] = ["data", "process", "technology"];

  return dimensions.map((dimension) => calculateDimensionReadiness(dimension, answers));
}

/**
 * Calculate overall readiness score
 * Red if any dimension is red
 * Amber if all dimensions are amber or better
 * Green if all dimensions are green
 */
export function calculateOverallReadiness(dimensionReadiness: DimensionReadiness[]): ReadinessScore {
  const hasRed = dimensionReadiness.some((dr) => dr.score === "red");
  const allGreen = dimensionReadiness.every((dr) => dr.score === "green");

  if (hasRed) return "red";
  if (allGreen) return "green";
  return "amber";
}

/**
 * Generate complete readiness result
 */
export function generateReadinessResult(answers: ReadinessAnswer[]): ReadinessResult {
  const dimensionReadiness = getDimensionReadiness(answers);
  const overallReadiness = calculateOverallReadiness(dimensionReadiness);

  return {
    answers,
    dimensionReadiness,
    overallReadiness,
    completedAt: new Date().toISOString(),
  };
}

/**
 * Get readiness summary text
 */
export function getReadinessSummary(dimension: ReadinessDimension, readiness: DimensionReadiness): string {
  const dimensionNames = {
    data: "Data Readiness",
    process: "Process Readiness",
    technology: "Technology Readiness",
  };

  const scoreDescriptions: Record<ReadinessScore, string> = {
    red: "requires significant preparation before implementation",
    amber: "needs some improvements but can proceed with careful planning",
    green: "is ready for immediate implementation",
  };

  const dimensionName = dimensionNames[dimension];
  const scoreDesc = scoreDescriptions[readiness.score];

  return `${dimensionName} scored ${readiness.score.toUpperCase()} (${readiness.greenCount}/${readiness.totalQuestions} green): ${scoreDesc}.`;
}

/**
 * Validate answers (ensure all questions have answers)
 */
export function validateReadinessAnswers(answers: ReadinessAnswer[]): {
  isValid: boolean;
  missingQuestions: string[];
} {
  const allQuestionsMap = getAllReadinessQuestions();
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
 * Save readiness result to localStorage
 */
export function saveReadinessResult(result: ReadinessResult): void {
  if (typeof window === "undefined") return;

  localStorage.setItem("fretron_readiness_result", JSON.stringify(result));
}

/**
 * Load readiness result from localStorage
 */
export function loadReadinessResult(): ReadinessResult | null {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("fretron_readiness_result");
  if (!saved) return null;

  try {
    return JSON.parse(saved) as ReadinessResult;
  } catch (error) {
    console.error("Failed to parse readiness result:", error);
    return null;
  }
}

/**
 * Clear readiness result from localStorage
 */
export function clearReadinessResult(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem("fretron_readiness_result");
}

/**
 * Get readiness color code
 */
export function getReadinessColor(score: ReadinessScore): string {
  const colors = {
    red: "#EF4444",
    amber: "#F59E0B",
    green: "#10B981",
  };

  return colors[score];
}

/**
 * Get readiness recommendation based on overall score
 */
export function getReadinessRecommendation(overallReadiness: ReadinessScore): {
  title: string;
  message: string;
  nextSteps: string[];
} {
  if (overallReadiness === "green") {
    return {
      title: "Ready to Proceed",
      message: "Your organization demonstrates strong readiness across all dimensions. You can proceed with implementing recommended levers immediately.",
      nextSteps: [
        "Prioritize levers based on business impact",
        "Review implementation playbooks",
        "Assign implementation team",
        "Set timeline and milestones",
      ],
    };
  }

  if (overallReadiness === "amber") {
    return {
      title: "Proceed with Caution",
      message: "Your organization shows moderate readiness. Focus on addressing amber/red areas before full-scale implementation.",
      nextSteps: [
        "Address red dimension gaps first",
        "Start with low-complexity levers",
        "Build capability in amber areas",
        "Plan phased implementation",
      ],
    };
  }

  return {
    title: "Preparation Required",
    message: "Your organization needs foundational improvements before implementing optimization levers. Focus on building data, process, and technology capabilities.",
    nextSteps: [
      "Digitize shipment records",
      "Standardize core processes",
      "Implement TMS or basic systems",
      "Re-assess readiness in 3-6 months",
    ],
  };
}
