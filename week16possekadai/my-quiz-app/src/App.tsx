import { useState } from 'react'

type QuizItem = {
  question: string
  answer: string
  distractors: [string, string, string]
}

type QuizQuestion = QuizItem & { choices: string[] }

const quizItems: QuizItem[] = [
  {
    question: 'イチゴの表面にあるつぶつぶは、正しくは何にあたるでしょうか？',
    answer: '果実',
    distractors: ['種', '花びら', '根'],
  },
  {
    question: 'キリンの胃袋は何個あるでしょうか？',
    answer: '4個',
    distractors: ['1個', '2個', '3個'],
  },
  {
    question: 'ダチョウの目は、何より大きいと言われることがあるでしょうか？',
    answer: '脳',
    distractors: ['心臓', 'くちばし', '卵'],
  },
  {
    question:
      'キスの天ぷらに使われるキスは正式にはシロギスと言いますが、白くないキスが日本に生息しています。絶滅危惧種でもあるそのキスは何色なのでしょうか。',
    answer: '青',
    distractors: ['赤', '黄', '黒'],
  },
  {
    question: 'しゃっくりは、主にどの部分がけいれんすることで起こるでしょうか？',
    answer: '横隔膜',
    distractors: ['肺', '声帯', '胃'],
  },
  {
    question: 'ペンギンが小石を相手に渡す行動は、何にたとえられることがあるでしょうか？',
    answer: 'プロポーズ',
    distractors: ['握手', '引っ越し', '食事のお誘い'],
  },
  {
    question: 'ニワトリが首を前後に動かしながら歩く理由として近いものはどれでしょうか？',
    answer: '視界を安定させるため',
    distractors: ['においを探すため', '仲間に合図するため', '体温を調節するため'],
  },
  {
    question: 'キティちゃんの正式名は？',
    answer: 'キティホワイト',
    distractors: ['ハローキティ', 'キティローズ', 'ミミィホワイト'],
  },
]

function shuffle<T,>(items: T[]): T[] {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled
}

function prepareQuestions(): QuizQuestion[] {
  return shuffle(quizItems).map((item) => ({
    ...item,
    choices: shuffle([item.answer, ...item.distractors]),
  }))
}

function App() {
  const [questions, setQuestions] = useState<QuizQuestion[]>(prepareQuestions)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [correctCount, setCorrectCount] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const currentQuestion = questions[currentIndex]
  const isCorrect = selectedChoice === currentQuestion?.answer
  const progress = ((currentIndex + 1) / questions.length) * 100

  function handleChoice(choice: string) {
    if (selectedChoice !== null) return

    setSelectedChoice(choice)
    if (choice === currentQuestion.answer) {
      setCorrectCount((count) => count + 1)
    }
  }

  function handleNext() {
    if (currentIndex === questions.length - 1) {
      setIsComplete(true)
      return
    }

    setCurrentIndex((index) => index + 1)
    setSelectedChoice(null)
  }

  function handleRestart() {
    setQuestions(prepareQuestions())
    setCurrentIndex(0)
    setSelectedChoice(null)
    setCorrectCount(0)
    setIsComplete(false)
  }

  if (isComplete) {
    const percentage = Math.round((correctCount / questions.length) * 100)

    return (
      <main className="quiz-background flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <section
          aria-labelledby="result-title"
          className="w-full max-w-xl animate-[rise_.45s_ease-out_both] rounded-[28px] border border-[#dbe7dd] bg-white px-6 py-10 text-center shadow-[0_22px_70px_-35px_rgba(31,73,48,0.32)] sm:px-12 sm:py-14"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#718579]">
            QUIZ COMPLETE
          </p>
          <div className="mx-auto mb-6 grid size-24 place-items-center rounded-full border-[6px] border-[#f5c66a] bg-[#fff8e8] text-3xl font-black text-[#a65e23]">
            {percentage}%
          </div>
          <h1 id="result-title" className="text-3xl font-black text-[#21372b] sm:text-4xl">
            おつかれさまでした！
          </h1>
          <p className="mt-4 text-lg font-bold text-[#365541]">
            {questions.length}問中 {correctCount}問正解
          </p>
          <p className="mt-1 text-sm text-[#718579]">正答率 {percentage}%</p>
          <button
            type="button"
            onClick={handleRestart}
            className="mt-9 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#286344] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#1d5036] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#286344]"
          >
            最初からやり直す
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="quiz-background min-h-screen px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-3xl">
        <header className="mb-7 flex items-center justify-between gap-4">
          <a href="#quiz" className="flex items-center gap-3 text-[#21372b] no-underline">
            <span className="grid size-11 place-items-center rounded-2xl bg-[#286344] text-lg font-black text-white shadow-sm">
              ?
            </span>
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#718579]">
                LITTLE FACTS
              </span>
              <span className="block text-base font-extrabold">雑学クイズ</span>
            </span>
          </a>
          <p className="rounded-full border border-[#d4e1d6] bg-white/75 px-3 py-1.5 text-xs font-bold text-[#587060]">
            全8問
          </p>
        </header>

        <section
          id="quiz"
          aria-labelledby="question-title"
          className="overflow-hidden rounded-[26px] border border-[#dbe7dd] bg-white shadow-[0_22px_70px_-35px_rgba(31,73,48,0.32)]"
        >
          <div className="border-b border-[#edf1ed] px-5 pb-5 pt-6 sm:px-9 sm:pt-8">
            <div className="mb-3 flex items-center justify-between text-xs font-bold">
              <span className="text-[#587060]">QUESTION {String(currentIndex + 1).padStart(2, '0')}</span>
              <span className="text-[#87968b]">{currentIndex + 1} / {questions.length}</span>
            </div>
            <div
              role="progressbar"
              aria-label="クイズの進捗"
              aria-valuemin={0}
              aria-valuemax={questions.length}
              aria-valuenow={currentIndex + 1}
              className="h-2 overflow-hidden rounded-full bg-[#edf2ee]"
            >
              <div
                className="h-full rounded-full bg-[#78a96d] transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="px-5 py-7 sm:px-9 sm:py-9">
            <h1 id="question-title" className="mb-7 text-[22px] font-extrabold leading-[1.55] text-[#21372b] sm:mb-8 sm:text-[27px]">
              {currentQuestion.question}
            </h1>

            <div className="grid gap-3 sm:grid-cols-2">
              {currentQuestion.choices.map((choice, index) => {
                const isAnswer = choice === currentQuestion.answer
                const isSelected = choice === selectedChoice
                let choiceStateClass = 'border-[#dbe5dc] bg-white hover:border-[#8bab8f] hover:bg-[#f8fbf8]'

                if (selectedChoice !== null && isAnswer) {
                  choiceStateClass = 'border-[#29805a] bg-[#eaf7ee] text-[#205b3d]'
                } else if (selectedChoice !== null && isSelected) {
                  choiceStateClass = 'border-[#cb5148] bg-[#fff0ed] text-[#9d3731]'
                } else if (selectedChoice !== null) {
                  choiceStateClass = 'border-[#e6ebe7] bg-[#fafbfa] text-[#8b968e]'
                }

                return (
                  <button
                    key={choice}
                    type="button"
                    disabled={selectedChoice !== null}
                    aria-pressed={isSelected}
                    onClick={() => handleChoice(choice)}
                    className={`flex min-h-[68px] w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold leading-relaxed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#286344] disabled:cursor-default sm:min-h-[76px] sm:text-base ${choiceStateClass}`}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f0f4f0] text-xs font-extrabold text-[#587060]">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{choice}</span>
                    {selectedChoice !== null && isAnswer && (
                      <span className="shrink-0 text-xs font-extrabold text-[#24734e]">正解</span>
                    )}
                    {selectedChoice !== null && isSelected && !isAnswer && (
                      <span className="shrink-0 text-xs font-extrabold text-[#b33d35]">回答</span>
                    )}
                  </button>
                )
              })}
            </div>

            {selectedChoice !== null && (
              <div
                role="status"
                aria-live="polite"
                className={`mt-5 rounded-xl px-4 py-3 text-sm font-semibold ${
                  isCorrect ? 'bg-[#edf8f0] text-[#276345]' : 'bg-[#fff2ef] text-[#9d4038]'
                }`}
              >
                {isCorrect
                  ? '正解！よく知っていますね。'
                  : `おしい！正解は「${currentQuestion.answer}」です。`}
              </div>
            )}

            <div className="mt-7 flex justify-end">
              {selectedChoice !== null && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#286344] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1d5036] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#286344]"
                >
                  {currentIndex === questions.length - 1 ? '結果を見る' : '次の問題へ'}
                  <span aria-hidden="true">→</span>
                </button>
              )}
            </div>
          </div>
        </section>
        <p className="mt-5 text-center text-xs font-medium text-[#829187]">
          {selectedChoice === null ? '答えをひとつ選んでください' : '回答を確認してから次へ進めます'}
        </p>
      </div>
    </main>
  )
}

export default App