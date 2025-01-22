import clsx from "clsx";
import IllustrationEmpty from "../icons/IllustrationEmpty";

const defaultContent = {
  title: "There is no feedback yet.",
  description:
    "Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.",
  isErrorButton: false,
};

const EmptyFeedback = () => {
  return (
    <div className="bg-white w-full rounded-lg h-[420px]">
      <div className="flex flex-col justify-center items-center py-8 lg:py-4">
        <div className="mb-6 md:mb-12">
          <IllustrationEmpty />
        </div>
        <h1 className="h1-bold capitalize">{defaultContent.title}</h1>
        <p
          className={clsx(
            `w-[58%] text-center mt-3 md:mt-4 first-letter:capitalize`
          )}
        >
          {defaultContent.description}
        </p>
      </div>
    </div>
  );
};

export default EmptyFeedback;
