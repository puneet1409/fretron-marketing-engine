"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check, HelpCircle, Target } from "lucide-react";
import {
  getAllQuestions,
  generateDiagnosticResult,
  saveDiagnosticResult,
  type DiagnosticQuestion,
  type DiagnosticAnswer,
  type DiagnosticMode,
} from "@/lib/diagnostic-engine";
import type { Pillar } from "@/types";

interface InteractiveDiagnosticProps {
  mode?: DiagnosticMode;
  onComplete: () => void;
  onCancel: () => void;
}

export function InteractiveDiagnostic({ mode = "comprehensive", onComplete, onCancel }: InteractiveDiagnosticProps) {
  const [currentPillarIndex, setCurrentPillarIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DiagnosticAnswer[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  const pillars: Pillar[] = ["cost", "service", "efficiency", "compliance"];
  const questionMap = getAllQuestions(mode);
  const currentPillar = pillars[currentPillarIndex];
  const currentQuestions = questionMap.get(currentPillar) || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const totalQuestions = Array.from(questionMap.values()).reduce(
    (sum, questions) => sum + questions.length,
    0
  );
  const answeredQuestions = answers.length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const isLastQuestionInPillar = currentQuestionIndex === currentQuestions.length - 1;
  const isLastPillar = currentPillarIndex === pillars.length - 1;

  const pillarNames = {
    cost: "Cost & Productivity",
    service: "Service & Experience",
    efficiency: "Efficiency & Throughput",
    compliance: "Risk & Compliance",
  };

  const pillarColors = {
    cost: "#1E40AF",
    service: "#10B981",
    efficiency: "#7C3AED",
    compliance: "#F59E0B",
  };

  const handleAnswer = (value: number) => {
    const newAnswer: DiagnosticAnswer = {
      questionId: currentQuestion.id,
      value,
    };

    // Update or add answer
    const existingIndex = answers.findIndex((a) => a.questionId === currentQuestion.id);
    const newAnswers =
      existingIndex >= 0
        ? [...answers.slice(0, existingIndex), newAnswer, ...answers.slice(existingIndex + 1)]
        : [...answers, newAnswer];

    setAnswers(newAnswers);

    // Auto-advance after short delay
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const handleNext = () => {
    if (isLastQuestionInPillar) {
      if (isLastPillar) {
        // Complete diagnostic
        completeDiagnostic();
      } else {
        // Move to next pillar
        setCurrentPillarIndex(currentPillarIndex + 1);
        setCurrentQuestionIndex(0);
        setShowHelp(false);
      }
    } else {
      // Move to next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHelp(false);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentPillarIndex > 0) {
      setCurrentPillarIndex(currentPillarIndex - 1);
      const prevQuestions = questionMap.get(pillars[currentPillarIndex - 1]) || [];
      setCurrentQuestionIndex(prevQuestions.length - 1);
    }
    setShowHelp(false);
  };

  const completeDiagnostic = () => {
    const result = generateDiagnosticResult(answers, mode);
    saveDiagnosticResult(result);
    onComplete();
  };

  const getCurrentAnswer = () => {
    return answers.find((a) => a.questionId === currentQuestion.id);
  };

  const currentAnswer = getCurrentAnswer();

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[600px] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === "light" ? "Light Diagnostic" : "Comprehensive Diagnostic"}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {mode === "light" ? "Quick 10-question assessment" : "Detailed 44-question assessment"} • {answeredQuestions} of {totalQuestions} completed
            </p>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Save & Exit
          </button>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-fretron-blue to-blue-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Pillar Indicator */}
        <div className="flex items-center justify-between mt-4">
          {pillars.map((pillar, index) => (
            <div
              key={pillar}
              className={`flex items-center gap-2 text-sm ${
                index === currentPillarIndex ? "font-semibold" : "text-gray-500"
              }`}
              style={{ color: index === currentPillarIndex ? pillarColors[pillar] : undefined }}
            >
              {index < currentPillarIndex && <Check className="w-4 h-4 text-green-600" />}
              {index === currentPillarIndex && <Target className="w-4 h-4" />}
              <span>{pillarNames[pillar]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {/* Pillar Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold text-white mb-4"
            style={{ backgroundColor: pillarColors[currentPillar] }}
          >
            <span>{pillarNames[currentPillar]}</span>
            <span className="text-xs opacity-75">
              {currentQuestionIndex + 1}/{currentQuestions.length}
            </span>
          </div>

          {/* Question */}
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{currentQuestion.question}</h3>

          {/* Help Text */}
          <div className="flex items-start gap-2 mb-6">
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="mt-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            {showHelp && (
              <p className="text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg p-3 flex-1">
                {currentQuestion.helpText}
              </p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = currentAnswer?.value === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-fretron-blue bg-blue-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                        isSelected
                          ? "border-fretron-blue bg-fretron-blue"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 mb-1">{option.label}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-gray-50 border-t border-gray-200 p-6">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={currentPillarIndex === 0 && currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-4">
            {currentAnswer && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-fretron-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <span>{isLastPillar && isLastQuestionInPillar ? "Complete" : "Next"}</span>
                {!(isLastPillar && isLastQuestionInPillar) && <ChevronRight className="w-5 h-5" />}
              </button>
            )}
            {!currentAnswer && (
              <div className="text-sm text-gray-500">Select an option to continue</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
