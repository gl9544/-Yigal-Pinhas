import React from "react";
import styled from "styled-components";
import img1 from "../assets/client-images/DVD/gallery-1.png";
import img2 from "../assets/client-images/DVD/gallery-2.png";
import img3 from "../assets/client-images/DVD/gallery-3.webp";
import img4 from "../assets/client-images/DVD/gallery-4.webp";
import img5 from "../assets/client-images/DVD/DVD.png";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

const Section = styled.section`
  background-color: var(--light-cream);
  min-height: 100vh;
  padding: 0 5%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media only screen and (min-width: 1440px) {
    padding: 0 10%;
  }
`;

const MainContent = styled.div`
  height: 70%;
  margin: 2rem 0;

  @media only screen and (max-width: 576px) {
    height: 85%;
    gap: 0%;
  }
`;

const Cover = styled.img`
  float: ${({ lng }) => (lng === "he" ? "left" : "right")};
  margin: ${({ lng }) => (lng === "he" ? "0 2rem 2rem 0" : "0 0rem 2rem 2rem")};
  width: 35%;

  @media only screen and (max-width: 768px) {
    width: 45%;
  }
  @media only screen and (max-width: 576px) {
    float: none;
    width: 90%;
    height: 20%;
    margin: 2rem 5%;
  }
`;

const TextContent = styled.div`
  @media only screen and (max-width: 576px) {
    width: 90%;
    text-align: justify;
    margin: auto;
  }
`;

const Rational = styled.p`
  text-align: justify;
  line-height: 1.4;

  @media only screen and (min-width: 1440px) {
    line-height: 1.7;
  }

  @media only screen and (max-width: 768px) {
    line-height: 1.5;
  }
  @media only screen and (max-width: 576px) {
    line-height: 1.5;
  }
`;

const Gallery = styled.div`
  flex: 4;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 2rem;

  @media only screen and (max-width: 768px) {
    justify-content: center;
    align-items: flex-end;
    gap: 1.5rem;
  }
  @media only screen and (max-width: 576px) {
    gap: 1rem;
    align-items: center;
  }
`;

const GalleryItem = styled.img`
  width: 23%;
  object-fit: cover;
  aspect-ratio: 16/12;

  @media only screen and (max-width: 768px) {
    width: 42%;
  }
  @media only screen and (max-width: 576px) {
    width: 75%;
  }
`;

const Purchase = styled.h3`
  font-size: 1.3rem;
  text-align: start;
`;

const Email = styled.span`
  font-weight: 400;
`;

const Credit = styled.p`
  font-size: 0.85rem;
  opacity: 0.7;
  text-align: center;
  margin: auto;
  margin-top: 10px;
`;

const data = [
  'אנטומיה, פיזולוגיה, קנסיולוגיה, תורת הכושר הגופני עיוני, מדעי האימון, חדרי כושר, כושר גופני מעשי וביומכניקה הם ברובם קורסי חובה בתהליך הכשרת פרחי ההוראה בביה"ס להשתלמויות, ביה"ס ללמודים מתקדמים, ביה"ס לחינוך גופני ותנועה, פקולטה לרפואה בהתמחות ללימודי פיזיותרפיה, ובפקולטה לקניסיולוגיה',
  "<strong>הספרות בנושאים אלו רבה ויקרה מאד</strong>",
  "אלה נושאים מורכבים ודורשים הבנה עמוקה, שינון רב ותפיסה חזותית ובחלק רב נדרשים יכולות הפשטה ותפישה תלת מימדית.",
  "נדרש אמצעי שייסע בלמידה, יעורר את הסקרנות ויגביר את <strong>ההנאה</strong> והתובנות מהשילוב של תחומי הדעת השונים",
  'אנו עדים ל"תרבות הישיבה" ולהיבטיה השלילים (השמנה, גידול במחלות הלב וכלי הדם, עצלות ועוד). היעדר ידע ומוטיבציה לפעילות גופנית גורמים אף הם לתופעות לוואי שליליות: אי מימוש מטרות האימון, פציעות בספורט, בזבוז זמן ולבסוף אף נשירה מפעילות גופנית. לכן החלטתי לפתח מדריך מולטימדי נרחב בשווי <strong>300,000$</strong> שיהיה <strong> שילוב מנצח </strong> בין הידע המחקרי האקדמי בתחומים של מדעי גוף האדם לבין עשייה מושכלת ונבונה שיובילו לאורך חיים בריא',
];

const DVD = () => {
  const { t } = useTranslation();
  const { lng } = useParams();
  const dvdData = t("MultimediaInfo", { returnObjects: true });
  const dvdDataArray = Object.entries(dvdData).map(([key, value]) => value);

  return (
    <Section>
      <h2>{t("Multimedia")}</h2>

      <MainContent>
        <Cover
          lng={lng}
          src={img5}
          alt={"Yigal Pinchas multimadia 3 - יגאל פנחס מולטימדיה"}
        />
        <TextContent>
          {dvdDataArray.map((paragraph, idx) => (
            <Rational
              key={idx}
              style={{ marginTop: "0" }}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            ></Rational>
          ))}
          <Purchase>
            {t("MultimediaContact")} <Email>{t("YigalMail")}</Email>
          </Purchase>
        </TextContent>
      </MainContent>
      <Gallery>
        <GalleryItem
          src={img1}
          alt={"Yigal Pinchas multimadia 3 - יגאל פנחס מולטימדיה"}
        />
        <GalleryItem
          src={img2}
          alt={"Yigal Pinchas multimadia 2 - יגאל פנחס מולטימדיה"}
        />
        <GalleryItem
          src={img3}
          alt={"Yigal Pinchas multimadia 1 - יגאל פנחס מולטימדיה"}
        />
        <GalleryItem
          src={img4}
          alt={"Yigal Pinchas multimadia 4 - יגאל פנחס מולטימדיה"}
        />
        <Credit>
          Multimedia Guide to Working Out in the Gym. Pinchas, Y & Katz, L.
          (2007). Sport Technology Research Lab., Savvy Knowledge Systems Crop.,
          and University of Calgary, Alberta, Canada.
        </Credit>
      </Gallery>
    </Section>
  );
};

export default DVD;
