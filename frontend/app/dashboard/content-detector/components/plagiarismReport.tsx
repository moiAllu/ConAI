import { IPlagrismDetection } from "@/types/contentDetection";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
interface props {
  selectedResult: string;
  setSelectedResult: any;
}
const PlagairismReport = async ({
  prompt,
  querywords,
  count,
  result,
  allpercentmatched,
  alltextmatched,
  allwordsmatched,
  selectedResult,
  setSelectedResult,
}: IPlagrismDetection & props) => {
  const highlightMatches = (str1: string, str2: string): JSX.Element => {
    const words1 = str1.split(" ");
    const words2 = str2.split(" ");

    // Loop over the words in string 1 and check if they exist in string 2
    const highlightedWords = words1.map((word, index) => {
      // Check if word is in the second string
      if (words2.includes(word)) {
        return (
          <span key={index} className="bg-red-200 dark:bg-red-950">
            {word}{" "}
          </span>
        );
      }
      return <span key={index}>{word} </span>;
    });

    return <>{highlightedWords}</>;
  };
  return (
    <div className="flex flex-col gap-2 h-full">
      <title>Result</title>
      <div className="sm:flex gap-4 justify-center grid grid-flow-row grid-cols-2">
        <div className="text-center justify-center border border-gray-500 rounded-lg sm:px-10 sm:py-2 p-2">
          <h1 className="font-bold">Web search</h1>
          <span className="font-bold text-lg text-green-500">
            {allpercentmatched}%
          </span>
          <p className="text-gray-600 text-sm">Plagarized</p>
        </div>
        <div className="text-center justify-center border border-gray-500 rounded-lg sm:px-10 sm:py-2 p-2">
          <h1 className="font-bold">Sources</h1>
          <span className="font-bold text-lg text-green-500">{count}</span>
          <p className="text-gray-600 text-sm">Sources Found</p>
        </div>
        <div className="text-center justify-center border border-gray-500 rounded-lg sm:px-10 sm:py-2 p-2">
          <h1 className="font-bold">Matched</h1>
          <span className="font-bold text-lg text-green-500">
            {allwordsmatched}
          </span>
          <p className="text-gray-600 text-sm">Words Count</p>
        </div>
      </div>
      <Card className=" flex space-x-2  p-1 justify-center shadow-none border-none    my-5  ">
        <Button
          onClick={() => {
            setSelectedResult("prompt");
          }}
          disabled={selectedResult === "prompt"}
          variant={selectedResult === "prompt" ? "secondary" : "ghost"}
        >
          Input
        </Button>
        <Button
          onClick={() => {
            setSelectedResult("matchedtext");
          }}
          disabled={selectedResult === "matchedtext"}
          variant={selectedResult === "matchedtext" ? "secondary" : "ghost"}
        >
          Web Source
        </Button>
        <Button
          onClick={() => {
            setSelectedResult("sources");
          }}
          disabled={selectedResult === "sources"}
          variant={selectedResult === "sources" ? "secondary" : "ghost"}
        >
          Sources
        </Button>
      </Card>
      {selectedResult === "matchedtext" && (
        <div className="flex flex-col space-y-2 p-2 sm:mt-5 overflow-y-auto h-full">
          <h1 className="font-semibold">Matched Words</h1>
          <p className="">
            <span className=" text-gray-500 text-sm">
              {highlightMatches(prompt || "", alltextmatched || "")}
            </span>
          </p>
        </div>
      )}
      {selectedResult === "prompt" && (
        <div className="flex flex-col space-y-2 p-2 sm:mt-5 overflow-y-auto h-full">
          <h1 className="font-semibold">Input</h1>
          <p className="">
            <span className="text-gray-500 text-sm">{prompt}</span>
          </p>
        </div>
      )}
      {selectedResult === "sources" && (
        <div className="gap-2 flex flex-col overflow-y-auto h-full">
          {result.map((content, idx) => (
            <Card key={idx} className="flex flex-col p-2">
              <CardTitle className="text-md">
                <span>Source: {content.title}</span>
              </CardTitle>
              <CardDescription className=" flex flex-col">
                <span>Words matched: {content.minwordsmatched} </span>
                <Link
                  href={content.viewurl}
                  className="text-blue-600"
                  target="_blank"
                >
                  url: {content.url.slice(25)}...
                </Link>
              </CardDescription>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlagairismReport;
