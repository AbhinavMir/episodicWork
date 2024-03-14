import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
interface ChapterCardProps {
  title: string;
  description: string;
  chapter: string;
  link: string;
}

export function ChapterCard({ title, description, chapter, link }: ChapterCardProps) {
  return (
    <div>
      <Card className="w-full max-w-lg p-5 space-y-4">
        <CardContent className="flex flex-col p-6 items-start space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
            <p className="text-sm text-gray-500 leading-none line-clamp-2">
              {description}
            </p>
          </div>
          <div className="flex-1" />
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">{chapter}</p>
            <Link href={link}>
            <Button size="sm">Read</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="space-x-4"></div>
    </div>
  );
}
