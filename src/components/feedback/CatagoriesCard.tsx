import { Categories } from "@/constants/feedback";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const CatagoriesCard = () => {
  const renderCategoriesBadge = () => {
    return Categories.map((category) => (
      <Button size="xs" key={category} variant="badge">
        {category}
      </Button>
    ));
  };

  return (
    <Card className="w-[15.9375rem] max-w-[15.9375rem] shadow-none">
      <CardContent className="flex flex-wrap gap-2 p-6">
        {renderCategoriesBadge()}
      </CardContent>
    </Card>
  );
};

export default CatagoriesCard;
