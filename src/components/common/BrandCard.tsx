import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import AnimatedWaveLogo from "./AnimatedWaveLogo";

const BrandCard = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-pink-500 w-[15.9375rem] max-w-[15.9375rem] px-6 pt-14 pb-6 shadow-none">
      <CardHeader className="p-0 ">
        <AnimatedWaveLogo size={30} isBrandTextRequired={false} />

        <CardTitle className="flex items-center h2-bold font-bold text-white">
          InsightFlow
        </CardTitle>
        <CardDescription className="body2-regular text-white/80">
          Feedback Board
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
export default BrandCard;
