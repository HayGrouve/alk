import { CheckCircle, Heart, Award, Users } from "lucide-react";

export function AboutValues() {
  const values = [
    {
      icon: CheckCircle,
      title: "Качество",
      description:
        "Използваме само най-добрите материали и прилагаме най-високите стандарти в производството.",
    },
    {
      icon: Heart,
      title: "Страст",
      description:
        "Всяка мебел е създадена с любов и внимание към детайла, защото вярваме в силата на ръчната работа.",
    },
    {
      icon: Award,
      title: "Прецизност",
      description:
        "Всеки милиметър е внимателно измерен, всеки ъгъл е перфектно обработен.",
    },
    {
      icon: Users,
      title: "Индивидуален подход",
      description:
        "Слушаме вашите нужди и създаваме мебели, които отговарят точно на вашите изисквания.",
    },
  ];

  return (
    <div className="mb-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold text-[#003c70]">
          Нашите ценности
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Тези принципи ни водят в работата си всеки ден и са в основата на
          всичко, което създаваме
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => {
          const IconComponent = value.icon;
          return (
            <div key={index} className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-[#5eb665] p-3">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#003c70]">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
