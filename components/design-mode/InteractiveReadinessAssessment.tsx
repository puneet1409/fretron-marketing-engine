"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, HelpCircle, Database, Cog, Cpu } from "lucide-react";
import {
  getAllReadinessQuestions,
  generateReadinessResult,
  saveReadinessResult,
  getReadinessColor,
  type ReadinessDimension,
  type ReadinessQuestion,
  type ReadinessAnswer,
  type ReadinessScore,
} from "@/lib/readiness-engine";

interface InteractiveReadinessAssessmentProps {
  onComplete: () => void;
  onCancel: () => void;
}

export function InteractiveReadinessAssessment({ onComplete, onCancel }: InteractiveReadinessAssessmentProps) {
  const [currentDimensionIndex, setCurrentDimensionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<ReadinessAnswer[]>([]);
  const [showHelp, setShowHelp] = useState(false);

  const dimensions: ReadinessDimension[] = ["data", "process", "technology"];
  const questionMap = getAllReadinessQuestions();
  const currentDimension = dimensions[currentDimensionIndex];
  const currentQuestions = questionMap.get(currentDimension) || [];
  const currentQuestion = currentQuestions[currentQuestionIndex];

  const totalQuestions = Array.from(questionMap.values()).reduce(
    (sum, questions) => sum + questions.length,
    0
  );
  const answeredQuestions = answers.length;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  const isLastQuestionInDimension = currentQuestionIndex === currentQuestions.length - 1;
  const isLastDimension = currentDimensionIndex === dimensions.length - 1;

  const dimensionInfo = {
    data: { name: "Data Readiness", icon: Database, color: "#3B82F6" },
    process: { name: "Process Readiness", icon: Cog, color: "#10B981" },
    technology: { name: "Technology Readiness", icon: Cpu, color: "#7C3AED" },
  };

  const handleAnswer = (value: number, score: ReadinessScore) => {
    const newAnswer: ReadinessAnswer = {
      questionId: currentQuestion.id,
      value,
      score,
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
    if (isLastQuestionInDimension) {
      if (isLastDimension) {
        // Complete assessment
        completeAssessment();
      } else {
        // Move to next dimension
        setCurrentDimensionIndex(currentDimensionIndex + 1);
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
    } else if (currentDimensionIndex > 0) {
      setCurrentDimensionIndex(currentDimensionIndex - 1);
      const prevQuestions = questionMap.get(dimensions[currentDimensionIndex - 1]) || [];
      setCurrentQuestionIndex(prevQuestions.length - 1);
    }
    setShowHelp(false);
  };

  const completeAssessment = () => {
    const result = generateReadinessResult(answers);
    saveReadinessResult(result);
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
            <h2 className="text-2xl font-bold text-gray-900">Readiness Assessment</h2>
            <p className="text-sm text-gray-600 mt-1">
              {answeredQuestions} of {totalQuestions} questions answered
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
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Dimension Indicator */}
        <div className="flex items-center justify-between mt-4">
          {dimensions.map((dimension, index) => {
            const Icon = dimensionInfo[dimension].icon;
            return (
              <div
                key={dimension}
                className={`flex items-center gap-2 text-sm ${
                  index === currentDimensionIndex ? "font-semibold" : "text-gray-500"
                }`}
                style={{ color: index === currentDimensionIndex ? dimensionInfo[dimension].color : undefined }}
              >
                {index < currentDimensionIndex && <Check className="w-4 h-4 text-green-600" />}
                {index === currentDimensionIndex && <Icon className="w-4 h-4" />}
                <span>{dimensionInfo[dimension].name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Question Content */}
      <div className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          {/* Dimension Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold text-white mb-4"
            style={{ backgroundColor: dimensionInfo[currentDimension].color }}
          >
            <span>{dimensionInfo[currentDimension].name}</span>
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
              const scoreColor = getReadinessColor(option.score);

              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value, option.score)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                        isSelected
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold text-gray-900">{option.label}</div>
                        <div
                          className="px-2 py-0.5 rounded text-xs font-bold text-white uppercase"
                          style={{ backgroundColor: scoreColor }}
                        >
                          {option.score}
                        </div>
                      </div>
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
            disabled={currentDimensionIndex === 0 && currentQuestionIndex === 0}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-4">
            {currentAnswer && (
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <span>{isLastDimension && isLastQuestionInDimension ? "Complete" : "Next"}</span>
                {!(isLastDimension && isLastQuestionInDimension) && <ChevronRight className="w-5 h-5" />}
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
