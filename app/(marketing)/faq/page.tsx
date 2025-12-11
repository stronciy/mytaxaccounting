import { Metadata } from 'next'
import Link from 'next/link'
import { Button, Section, Container } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about accounting services, fixed fee packages, IRD/Companies Office filings, and security.',
}

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Что входит в Starter, Core, Growth, Performance?',
    answer:
      'Starter: годовая финансовая отчётность и декларация по налогу на доход, управление IRD‑аккаунтом и напоминания, одна ежегодная встреча, базовая email‑поддержка. Core: всё из Starter + подготовка и сдача GST, квартальные/двухмесячные отчёты из Xero, годовой возврат Companies Office, быстрые вопросы по email/телефону. Growth: всё из Core + зарплатный учёт и payday filing (напр. до 5 сотрудников), обзор дебиторов/кредиторов и базовый комментарий по cash‑flow, 2–4 встречи в год. Performance: всё из Growth + годовой бюджет и cash‑flow прогноз, квартальные отчёты и accountability‑встречи, налоговое планирование до конца года, простая стратегика/бенчмаркинг.',
  },
  {
    question: 'Обрабатываете ли вы IRD, PAYE/ESCT, FBT и Companies Office?',
    answer:
      'Да. Мы ведём IRD‑аккаунты, отправляем напоминания и сдаём отчётность: GST, PAYE/ESCT, FBT, декларации по налогу на доход. Годовой возврат Companies Office включён в Core+. Аудиты/обжалования IRD доступны как add‑on.',
  },
  {
    question: 'Можно ли менять пакет и подключать add‑ons?',
    answer:
      'Да. Пакеты помесячные — можно повышать/понижать тариф и добавлять услуги: Xero/MYOB подписка, rental schedules, сложные структуры (группы, фонды, трасты), IRD audits/objections, реструктуризации и разовые проекты.',
  },
  {
    question: 'Насколько безопасны мои финансовые данные?',
    answer:
      'Шифрование AES‑256 (at rest) и TLS 1.3 (in transit), ограниченный доступ по ролям, двухфакторная аутентификация, регулярные аудиты безопасности. NDA по умолчанию. По запросу — политика хранения и удаление через 90 дней. Без передачи третьим лицам.',
  },
  {
    question: 'Как вы подтверждаете корректность расчётов и сдачи отчётности?',
    answer:
      'Многоуровневые проверки: сверки по GST, PAYE/ESCT, FBT, контроль дедлайнов IRD, двойной человеческий обзор, хранение подтверждений отправки и отчётов. Документированные чек‑листы доступны для аудита.',
  },
  {
    question: 'Сколько стоит и как выставляются счета?',
    answer:
      'Fixed fee: Starter (~$150–$220/мес), Core (~$250–$350/мес), Growth (~$400–$550/мес), Performance (~$650–$900+/мес). Счета ежемесячно, без долгосрочных обязательств. Дополнительные услуги — по отдельному прайсу.',
  },
  {
    question: 'Что нужно предоставить для старта?',
    answer:
      'Базовые данные о бизнесе, доступ к Xero/MYOB, информация по сотрудникам (для payroll), и существующие IRD/Coys Office детали. Мы поможем собрать недостающее.',
  },
]

export default function FAQPage() {
  return (
    <>
      <Section background="gray">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">Everything you need to know about our accounting services.</p>
          </div>
        </Container>
      </Section>

      <Section background="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section background="gray">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-8">
              Our team is here to help. Reach out and we will get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="accent" size="lg">
                  Contact Us
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg">See Price List</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
