import data from "../assets/data.js";
import TopicCard from "../components/TopicCard.jsx";
import PrimaryButton from "../components/PrimaryButton.jsx";
import { useState } from "react";

export default function Topics() {
  const [topics, setTopics] = useState(data);

  return (
    <>
      <div className="flex items-center justify-between mx-auto mb-7">
        <span className="inline-block w-1/3">
          {topics.length} {topics.length === 1 ? "Thema" : "Themen"}
        </span>
        <h1 className="text-center text-2xl">Alle Themen</h1>
        <div className="w-1/3 text-end">
          <PrimaryButton text="Neues Thema" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
        {topics.map((topic) => (
          <TopicCard
            key={topic.id}
            topicName={topic.topicName}
            questionCount={topic.quiz.length}
            topicId={topic.id}
          />
        ))}
      </div>
    </>
  );
}
