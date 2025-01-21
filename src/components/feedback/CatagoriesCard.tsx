import { getAllCategories } from "@/data/feedback.data";
import clsx from "clsx";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const CatagoriesCard = async () => {
  const categories = await getAllCategories();
  const updatedCategories = [{ name: "all", id: "1" }, ...categories];
  const renderCategoriesBadge = () => {
    return updatedCategories.map((category) => (
      <Button
        size="xs"
        key={category.name}
        variant="badge"
        className={clsx({
          uppercase: category.name.length <= 2,
          capitalize: category.name.length > 2,
        })}
      >
        {category.name}
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
