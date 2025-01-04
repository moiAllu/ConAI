import { IAiDetection } from "@/types/contentDetection";

const AIDetectionReport = ({
  method,
  _id,
  prompt,
  createdAt,
  response,
}: IAiDetection) => {
  return (
    <div className="flex flex-col gap-2 ">
      <div>{prompt}</div>
      <div className="flex flex-col gap-2">
        <title>Result</title>

        <div className="flex flex-col gap-1">
          <span>{response.aiDetected ? "AI detected " : "Not Detected"}</span>
          <span>AI Deteted Percentage {response.aiPercentage}%</span>
          <span> AI Model Confidence {response.confidence}</span>
          <div>
            {response.aiContent.map((content, idx) => (
              <span key={idx}>{content}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIDetectionReport;
