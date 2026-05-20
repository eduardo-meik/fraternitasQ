import ClientQuestionnaire from './questionnaire-client';

export function generateStaticParams() {
  return [
    { id: '202605_fraternitas' }
  ];
}

export default function QuestionnairePage() {
  return <ClientQuestionnaire />;
}