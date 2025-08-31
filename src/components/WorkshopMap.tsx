import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WorkshopMap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-[#003C70]">Намерете ни</CardTitle>
        <CardDescription>Нашият цех се намира в Нови Искър</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23415.583096386687!2d23.332975902825982!3d42.810587286958345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa925c75fa44c5%3A0x97671ce861896748!2sNovi%20Iskar!5e0!3m2!1sen!2sbg!4v1756645085363!5m2!1sen!2sbg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Карта на местоположението на a-el-key цеха в София"
            aria-label="Интерактивна карта показваща местоположението на нашия цех в София. Можете да използвате стрелките за навигация и колелцето на мишката за приближаване и отдалечаване."
          />
        </div>
      </CardContent>
    </Card>
  );
}
