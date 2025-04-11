import popSound from "../assets/pop.mp3";
import bgMusic from "../assets/bg-music.mp3";

const pop = new Audio(popSound);
const backgroundMusic = new Audio(bgMusic);
backgroundMusic.loop = true;
backgroundMusic.volume = 0.3;
