import { Categories } from "@/constants/feedback";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

const CatagoriesCard = () => {
  const renderCategoriesBadge = () => {
    return Categories.map((category) => (
      <Badge tabIndex={0} key={category} variant="category">
        {category}
      </Badge>
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
