import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";

interface ChapterCardProps {
  title: string;
  description: string;
  chapter: string;
}

export function ChapterCard({ title, description, chapter }: ChapterCardProps) {
  return (
    <Card className="w-full max-w-lg">
      <CardContent className="flex flex-col p-6 items-start space-y-4">
        <div className="space-y-1.5">
          <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
          <p className="text-sm text-gray-500 leading-none">{description}</p>
        </div>
        <div className="flex-1" />
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">{chapter}</p>
          <Button size="sm">Read</Button>
        </div>
      </CardContent>
    </Card>
  );
}
