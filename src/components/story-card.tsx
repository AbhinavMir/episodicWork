import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

export default function StoryCard({ story, authorName }: { story: any; authorName: string }) {

  const { title, description, author_id, name } = story;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium">Author: {authorName}</div>
        </div>
      </CardFooter>
    </Card>
  );
}
