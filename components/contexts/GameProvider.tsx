"use client";
import Player from "@/constructors/Player";
import * as React from "react";

export type TurnType = "TurnA" | "TurnB" | null;

export type GameContextType = {
  turn: TurnType;
  setTurn: (index: TurnType) => void;
  teamA: Player;
  teamB: Player;
  setTeamA: (d: Player) => void;
  setTeamB: (d: Player) => void;
  handleScore: (d: number) => void;
  handleMistake: () => void;
  handleResetMistake: () => void;
  handleResetScore: () => void;
};

export const GameContext = React.createContext<GameContextType>({
  turn: null,
  setTurn: (index: TurnType) => {},
  teamA: new Player("temp"),
  teamB: new Player("temp"),
  setTeamA: (index: Player) => {},
  setTeamB: (index: Player) => {},
  handleScore: (index: number) => {},
  handleMistake: () => {},
  handleResetMistake: () => {},
  handleResetScore: () => {},
});

export const useGame = () => React.useContext(GameContext);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [turn, setTurn] = React.useState<TurnType>(null);

  const [teamA, setTeamA] = React.useState(new Player("TeamA"));
  const [teamB, setTeamB] = React.useState(new Player("TeamB"));

  function handleScore(toAdd: number) {
    if (turn === "TurnB")
      setTeamB((prevTeam) => {
        const updatedTeam = new Player(
          prevTeam.name,
          prevTeam.score,
          prevTeam.mistakes
        );
        updatedTeam.increaseScore(toAdd);
        return updatedTeam;
      });
    else {
      setTeamA((prevTeam) => {
        const updatedTeam = new Player(
          prevTeam.name,
          prevTeam.score,
          prevTeam.mistakes
        );
        updatedTeam.increaseScore(toAdd);
        return updatedTeam;
      });
    }
  }

  function handleResetScore() {
    setTeamB((prevTeam) => {
      const updatedTeam = new Player(
        prevTeam.name,
        prevTeam.score,
        prevTeam.mistakes
      );
      updatedTeam.resetScore();
      return updatedTeam;
    });
    setTeamA((prevTeam) => {
      const updatedTeam = new Player(
        prevTeam.name,
        prevTeam.score,
        prevTeam.mistakes
      );
      updatedTeam.resetScore();
      return updatedTeam;
    });
  }

  function handleMistake() {
    if (teamB.getMistakes() < 3 && turn === "TurnB")
      setTeamB((prevTeam) => {
        const updatedTeam = new Player(
          prevTeam.name,
          prevTeam.score,
          prevTeam.mistakes
        );
        updatedTeam.increaseMistakes();
        return updatedTeam;
      });
    else if (teamA.getMistakes() < 3 && turn === "TurnA") {
      setTeamA((prevTeam) => {
        const updatedTeam = new Player(
          prevTeam.name,
          prevTeam.score,
          prevTeam.mistakes
        );
        updatedTeam.increaseMistakes();
        return updatedTeam;
      });
    }
  }

  function handleResetMistake() {
    if (teamB.getMistakes() === 3 && turn === "TurnB")
      setTeamB((prevTeam) => {
        const updatedTeam = new Player(
          prevTeam.name,
          prevTeam.score,
          prevTeam.mistakes
        );
        updatedTeam.resetMistakes();
        return updatedTeam;
      });
    else if (teamA.getMistakes() === 3 && turn === "TurnA") {
      setTeamA((prevTeam) => {
        const updatedTeam = new Player(
          prevTeam.name,
          prevTeam.score,
          prevTeam.mistakes
        );
        updatedTeam.resetMistakes();
        return updatedTeam;
      });
    } else {
      setTeamB((prevTeam) => {
        const updatedTeam = new Player(
          prevTeam.name,
          prevTeam.score,
          prevTeam.mistakes
        );
        updatedTeam.resetMistakes();
        return updatedTeam;
      });
      setTeamA((prevTeam) => {
        const updatedTeam = new Player(
          prevTeam.name,
          prevTeam.score,
          prevTeam.mistakes
        );
        updatedTeam.resetMistakes();
        return updatedTeam;
      });
    }
  }

  return (
    <GameContext.Provider
      value={{
        turn,
        setTurn,
        teamA,
        teamB,
        setTeamA,
        setTeamB,
        handleScore,
        handleMistake,
        handleResetMistake,
        handleResetScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
