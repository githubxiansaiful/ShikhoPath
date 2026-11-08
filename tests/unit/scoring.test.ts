import test, { describe, it } from 'node:test';
import assert from 'node:assert/strict';

function calculateGrammarScore(correctCount: number, totalQuestions: number): number {
  if (totalQuestions === 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

function estimateIeltsReadingBand(correctCount: number): number {
  if (correctCount >= 39) return 9.0;
  if (correctCount >= 37) return 8.5;
  if (correctCount >= 35) return 8.0;
  if (correctCount >= 33) return 7.5;
  if (correctCount >= 30) return 7.0;
  if (correctCount >= 27) return 6.5;
  if (correctCount >= 23) return 6.0;
  if (correctCount >= 19) return 5.5;
  if (correctCount >= 15) return 5.0;
  return 4.5;
}

describe('Educational Scoring Engines', () => {
  it('correctly calculates grammar quiz percentage', () => {
    assert.equal(calculateGrammarScore(8, 10), 80);
    assert.equal(calculateGrammarScore(10, 10), 100);
    assert.equal(calculateGrammarScore(0, 5), 0);
  });

  it('correctly calculates IELTS Academic Reading band estimations', () => {
    assert.equal(estimateIeltsReadingBand(40), 9.0);
    assert.equal(estimateIeltsReadingBand(38), 8.5);
    assert.equal(estimateIeltsReadingBand(35), 8.0);
    assert.equal(estimateIeltsReadingBand(33), 7.5);
    assert.equal(estimateIeltsReadingBand(30), 7.0);
    assert.equal(estimateIeltsReadingBand(27), 6.5);
    assert.equal(estimateIeltsReadingBand(23), 6.0);
    assert.equal(estimateIeltsReadingBand(10), 4.5);
  });
});
