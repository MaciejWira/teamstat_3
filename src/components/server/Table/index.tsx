import FilterNav from "@/components/client/FilterNav";
import { GetTableReturnType, PlayerStats } from "@/services/getTable";
import getGames from "@/services/getGames";
import HeadingWrapper from "@/components/server/HeadingWrapper";
import Heading from "@/components/server/Heading";
import TextC, { TextSpan } from "@/components/server/TextC";
import CoreTable from "@/components/server/Table/components/CoreTable";
import Separator from "@/components/server/Separator";
import styles from "./Table.module.scss";

type Props = GetTableReturnType & {
  heading?: string;
  roundsText?: string;
  isCaptains?: boolean;
};

const Table: React.FC<Props> = async ({
  heading,
  table,
  rounds = 0,
  roundsText = "Ilość kolejek",
  isCaptains,
}) => {
  const { lastGameDate } = await getGames();
  return (
    <div className={styles.Container}>
      <FilterNav isCaptains={isCaptains} />
      <HeadingWrapper>
        {heading && <Heading className={styles.Heading}>{heading}</Heading>}
        <TextC className={styles.SubHeading}>
          {
            <>
              <span>
                {roundsText}: <TextSpan theme={["white"]}>{rounds}</TextSpan>
              </span>
              <Separator />
            </>
          }
          <span>
            Ostatni mecz: <TextSpan theme={["white"]}>{lastGameDate}</TextSpan>
          </span>
        </TextC>
      </HeadingWrapper>
      {!rounds ? (
        <TextC theme={["white", "large"]}>Brak meczów</TextC>
      ) : (
        <CoreTable table={table} rounds={rounds} />
      )}
    </div>
  );
};

export default Table;
