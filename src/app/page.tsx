import getTable, { sortTable } from "@/services/getTable";
import "./styles.scss";

export default async function Home() {
  const table = await getTable();

  return (
    <main>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>Zawodnik</td>
            <td>Mecze</td>
            <td>Punkty</td>
            <td>Wygrane</td>
            <td>Remisy</td>
            <td>Przegrane</td>
            <td>Gole</td>
            <td>Strzelone</td>
            <td>Stracone</td>
          </tr>
          {sortTable(table).map((row, index) => (
            <tr key={row.id}>
              <td>{index + 1}</td>
              <td>{row.title}</td>
              <td>{row.games}</td>
              <td>{row.points}</td>
              <td>{row.wins}</td>
              <td>{row.draws}</td>
              <td>{row.losses}</td>
              <td>{row.goalsDifference}</td>
              <td>{row.goalsFor}</td>
              <td>{row.goalsAgainst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
