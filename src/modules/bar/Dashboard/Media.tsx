import AstalMpris from "gi://AstalMpris";
import { createBinding, createComputed, createState, With } from "ags";

export default function Media() {
  const mpris = AstalMpris.get_default();
  const players = createBinding(mpris, "players");

  return (
    <box class="dashboard-media" widthRequest={300} heightRequest={300}>
      <With value={players}>
        {(players) => {
          const [currentIndex, setCurrentIndex] = createState<number>(0);
          const currentPlayer = createComputed(
            [currentIndex],
            (currentIndex) => {
              return players[currentIndex];
            },
          );

          return (
            <box class="dashboard-media-content">
              <With value={currentPlayer}>
                {(currentPlayer) =>
                  currentPlayer && (
                    <box
                      css={createBinding(
                        currentPlayer,
                        "artUrl",
                      )(
                        (url) => `
                        min-width: 300px;
                        min-height: 300px;
                        background-image: url("${url}");
                        background-size: 300px 300px;
                        background-position: center;
                        background-repeat: no-repeat;
                      `,
                      )}
                    >
                      hi
                    </box>
                  )
                }
              </With>
            </box>
          );
        }}
      </With>
    </box>
  );
}
