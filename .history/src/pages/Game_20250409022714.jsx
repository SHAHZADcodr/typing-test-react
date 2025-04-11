// Game.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import '../customCss/Game.css';
import popSound from '../assets/pop.mp3';
import bgMusicFile from '../assets/background.mp3';

const wordBank = {
  easy:  ['apple', 'ball', 'cat', 'dog', 'egg', 'fish', 'grape', 'hat', 'ice', 'juice', 'kite', 'lemon', 'moon', 'nest', 'orange', 'piano', 'queen', 'rabbit', 'sun', 'tree', 'umbrella', 'violin', 'whale', 'xylophone', 'yogurt', 'zebra', 'ant', 'book', 'chair', 'desk', 'elephant', 'flower', 'garden', 'house', 'island', 'jacket', 'key', 'lamp', 'mountain', 'notebook', 'ocean', 'pencil', 'quilt', 'rainbow', 'star', 'turtle', 'uniform', 'volcano', 'window', 'x-ray', 'yellow', 'zipper', 'angel', 'banana', 'cloud', 'dolphin', 'engine', 'feather', 'guitar', 'hammer', 'igloo', 'jungle', 'kangaroo', 'ladder', 'magnet', 'necklace', 'octopus', 'peanut', 'question', 'rocket', 'sandwich', 'tiger', 'unicorn', 'village', 'watermelon', 'xylophonist', 'yacht', 'zucchini', 'apricot', 'bicycle', 'candle', 'dragon', 'envelope', 'fountain', 'galaxy', 'highway', 'insect', 'jigsaw', 'koala', 'lantern', 'microscope', 'necklace', 'ostrich', 'penguin', 'quarter', 'rhinoceros', 'sandwich', 'telephone', 'universe', 'vegetable', 'waterfall', 'xylophone', 'yacht', 'zeppelin', 'acorn', 'butterfly', 'cucumber', 'dinosaur', 'elephant', 'flamingo', 'gorilla', 'hamburger', 'iguana', 'jellyfish', 'kangaroo', 'lemonade', 'marshmallow', 'narwhal', 'oatmeal', 'porcupine', 'quokka', 'raccoon', 'squirrel', 'tambourine', 'ukulele', 'vampire', 'walrus', 'xylophonist', 'yam', 'zucchini', 'aardvark', 'blueberry', 'crocodile', 'daffodil', 'echidna', 'firefly', 'gecko', 'hedgehog', 'iceberg', 'jackal', 'kiwi', 'lemur', 'mongoose', 'nightingale', 'orangutan', 'platypus', 'quail', 'reindeer', 'seahorse', 'toucan', 'urchin', 'vulture', 'wombat', 'xerus', 'yak', 'zebu', 'albatross', 'barracuda', 'chameleon', 'dingo', 'emu', 'falcon', 'gazelle', 'heron', 'ibis', 'jaguar', 'kookaburra', 'lobster', 'meerkat', 'nautilus', 'oryx', 'puffin', 'quetzal', 'roadrunner', 'salamander', 'tarantula', 'urchin', 'viper', 'warthog', 'xenops', 'yeti', 'zorilla', 'anemone', 'bison', 'caribou', 'damselfly', 'eel', 'ferret', 'guppy', 'hornet', 'isopod', 'jay', 'krill', 'locust', 'macaw', 'nudibranch', 'osprey', 'piranha', 'quokka', 'rattlesnake', 'scorpion', 'tarpon', 'urchin', 'vole', 'wasp', 'xenopus', 'yellowhammer', 'zander', 'anchovy', 'bonobo', 'cormorant', 'dugong', 'egret', 'finch', 'gibbon', 'haddock', 'ibis', 'jackrabbit', 'kingfisher', 'lionfish', 'manatee', 'numbat', 'ocelot', 'parakeet', 'quahog', 'redstart', 'starfish', 'terrapin', 'urchin', 'vireo', 'wagtail', 'xenarthra', 'yellowjacket', 'zebrafinch', 'aardwolf', 'bandicoot', 'cassowary', 'dormouse', 'eland', 'fossa', 'genet', 'hoopoe', 'ibex', 'jerboa', 'kinkajou', 'lyrebird', 'muntjac', 'nuthatch', 'oriole', 'pangolin', 'quoll', 'ringtail', 'serval', 'tenrec', 'umbrellabird', 'vervet', 'wallaby', 'xenopus', 'yapok', 'zorilla', 'axolotl', 'binturong', 'coati', 'dikdik', 'echidna', 'fennec', 'galago', 'hoatzin', 'indigo', 'jackdaw', 'kudu', 'loris', 'margay', 'numbat', 'olingo', 'peccary', 'quetzal', 'raccoon', 'saki', 'tamarin', 'uakari', 'vanga', 'wolverine', 'xerus', 'yapok', 'zorilla'],
  medium: ['abase', 'abate', 'abdicate', 'aberration', 'abhor', 'abject', 'abjure', 'abnegation', 'abrogate', 'abscond', 'abstruse', 'accede', 'acerbic', 'acquiesce', 'acrimony', 'acumen', 'adumbrate', 'affluent', 'aggrandize', 'alacrity', 'alias', 'ambivalent', 'ameliorate', 'amenable', 'anachronistic', 'anathema', 'annex', 'antediluvian', 'antipathy', 'antithesis', 'apocryphal', 'approbation', 'arrogate', 'ascetic', 'aspersion', 'assiduous', 'atrophy', 'attenuate', 'audacious', 'augury', 'austere', 'avarice', 'baleful', 'banal', 'beguile', 'belie', 'belligerent', 'benevolent', 'benign', 'bequeath', 'berate', 'bereft', 'bifurcate', 'bilk', 'blandishment', 'bombastic', 'boon', 'bourgeois', 'bowdlerize', 'bucolic', 'burnish', 'buttress', 'cacophony', 'cajole', 'calumny', 'camaraderie', 'candor', 'capitulate', 'capricious', 'carp', 'catalyst', 'catharsis', 'caustic', 'censure', 'chagrin', 'charlatan', 'chicanery', 'chide', 'churlish', 'circuitous', 'circumlocution', 'circumscribe', 'circumvent', 'clandestine', 'clemency', 'coalesce', 'cogent', 'cognizant', 'commensurate', 'complement', 'compunction', 'concomitant', 'conflagration', 'confluence', 'congenial', 'congruity', 'connive', 'consign', 'constituent', 'construe', 'contumacious', 'conundrum', 'convivial', 'copious', 'corpulence', 'coterie', 'credulity', 'crescendo', 'culpable', 'cursory', 'curt', 'dearth', 'debacle', 'debunk', 'decorous', 'decry', 'defunct', 'deleterious', 'demagogue', 'demur', 'denigrate', 'denizen', 'deprecate', 'deride', 'despot', 'diaphanous', 'didactic', 'diffident', 'dilatory', 'diminutive', 'discomfit', 'discordant', 'disparate', 'dissemble', 'dissonance', 'divisive', 'dogmatic', 'dormant', 'dour', 'duplicity', 'ebullient', 'eclectic', 'edify', 'efface', 'effervescent', 'efficacious', 'effrontery', 'egregious', 'elicit', 'elucidate', 'emaciated', 'embellish', 'emend', 'emollient', 'empirical', 'encomium', 'enervate', 'engender', 'enmity', 'ennui', 'ephemeral', 'epistolary', 'equanimity', 'equivocal', 'erudite', 'eschew', 'esoteric', 'espouse', 'ethereal', 'evanescent', 'evince', 'exacerbate', 'exculpate', 'execrable', 'exigent', 'exonerate', 'expedient', 'expiate', 'expunge', 'extant', 'extol', 'extraneous', 'extrapolate', 'extricate', 'facetious', 'fallacious', 'fastidious', 'fatuous', 'fecund', 'felicitous', 'feral', 'fervent', 'fetid', 'flagrant', 'florid', 'fractious', 'garrulous', 'gourmand', 'grandiloquent', 'gregarious', 'hackneyed', 'hapless', 'harangue', 'hegemony', 'heterogeneous', 'hiatus', 'hierarchy', 'histrionic', 'homogeneous', 'hubris', 'hyperbole', 'iconoclast', 'idiosyncratic', 'idyllic', 'ignominious', 'illicit', 'imbroglio', 'immutable', 'impassive', 'impecunious', 'imperious', 'impetuous', 'impinge', 'implacable', 'impugn', 'inchoate', 'incontrovertible', 'incorrigible', 'indefatigable', 'indigent', 'indolent', 'ineffable', 'inexorable', 'ingenuous', 'inimical', 'iniquity', 'insidious', 'insipid', 'intransigent', 'intrepid', 'inure', 'invective', 'inveterate', 'irascible', 'itinerant', 'juxtaposition', 'laconic', 'languid', 'largess', 'latent', 'legerdemain', 'licentious', 'limpid', 'linchpin', 'lithe', 'loquacious', 'luminous', 'magnanimous', 'malevolent', 'malinger', 'malleable', 'mandate', 'manifest', 'maudlin', 'maverick', 'mawkish', 'maxim', 'mellifluous', 'mendacious', 'mercurial', 'meritorious', 'metamorphosis', 'meticulous', 'mitigate', 'modicum', 'morass', '
],
  hard: ['algorithm', 'symphony', 'hypothesis', 'university', 'revolution']
};

const Game = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { difficulty = 'easy', duration = 60 } = state || {};

  const [words, setWords] = useState([]);
  const [typed, setTyped] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [showToast, setShowToast] = useState(true);
  const [bgMusicPlaying, setBgMusicPlaying] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);

  const wordId = useRef(0);
  const endGameCalled = useRef(false);
  const pop = new Audio(popSound);
  const bgMusic = useRef(new Audio(bgMusicFile));
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();

    bgMusic.current.loop = true;
    bgMusic.current.play().catch(err => console.error('Music play error:', err));

    let timerId = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // ✅ Watch timeLeft separately to trigger endGame
  useEffect(() => {
    if (timeLeft === 0 && !endGameCalled.current) {
      endGameCalled.current = true;
      endGame();
    }
  }, [timeLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameEnded) {
        const word = wordBank[difficulty][Math.floor(Math.random() * wordBank[difficulty].length)];
        const newWord = {
          id: wordId.current++,
          text: word,
          top: 0,
          left: Math.random() * 80 + 10,
          color: 'default'
        };
        setWords((prev) => [...prev, newWord]);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [difficulty, gameEnded]);

  useEffect(() => {
    const falling = setInterval(() => {
      setWords((prevWords) => {
        const updated = prevWords.map((word) => ({ ...word, top: word.top + 1 }));
        const missedWords = updated.filter((word) => word.top >= 90);

        if (missedWords.length > 0) {
          setMissed((m) => m + missedWords.length);
        }

        return updated.filter((word) => word.top < 90);
      });
    }, 100);
    return () => clearInterval(falling);
  }, []);

  const handleTyping = (e) => {
    const input = e.target.value;

    if (bgMusicPlaying && bgMusic.current.paused) {
      bgMusic.current.loop = true;
      bgMusic.current.play().catch((err) => console.error('Audio play error:', err));
    }

    setTyped(input);

    if (input.endsWith(' ')) {
      const trimmedInput = input.trim();
      const found = words.find((w) => w.text === trimmedInput);

      if (found) {
        pop.play();
        setScore((s) => s + 1);
        highlightAndRemove(found.id, 'green');
      } else {
        setMissed((m) => m + 1);
        const randomWord = words[0];
        if (randomWord) highlightAndRemove(randomWord.id, 'red');
      }

      setTyped('');
    }
  };

  const highlightAndRemove = (id, color) => {
    setWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, color } : w))
    );
    setTimeout(() => {
      setWords((prev) => prev.filter((w) => w.id !== id));
    }, 300);
  };

  const endGame = () => {
    if (gameEnded) return;
    setGameEnded(true);
    endGameCalled.current = true;

    bgMusic.current.pause();
    bgMusic.current.currentTime = 0;
    setBgMusicPlaying(false);

    const total = score + missed;
    const accuracy = total === 0 ? 0 : Math.round((score / total) * 100);
    const wpm = Math.round(score / (duration / 60));

    const result = { score, missed, accuracy, wpm, total };

    setTimeout(() => {
      navigate('/gameover', { state: { result } });
    }, 100); // slight delay to ensure state updates
  };

  const toggleBgMusic = () => {
    if (bgMusicPlaying) {
      bgMusic.current.pause();
    } else {
      bgMusic.current.play();
    }
    setBgMusicPlaying(!bgMusicPlaying);
  };

  return (
    <Container fluid className="game-container">
      <Toast className="toast-message centered-toast" show={showToast} onClose={() => setShowToast(false)} delay={2000} autohide>
        <Toast.Header>
          <strong className="me-auto">Typing Tip</strong>
        </Toast.Header>
        <Toast.Body>You have to press space after typing every word!</Toast.Body>
      </Toast>

      <div className="top-bar">
        <div className="top-item">⏱ Time Left: {timeLeft}s</div>
        <div className="top-item">✅ Score: {score}</div>
        <div className="top-item">❌ Missed: {missed}</div>
        <div className="top-item">
          <Button variant={bgMusicPlaying ? 'danger' : 'success'} onClick={toggleBgMusic} className="music-toggle-button">
            {bgMusicPlaying ? '🔇 Mute Music' : '🔊 Play Music'}
          </Button>
        </div>
      </div>

      <div className="falling-area">
        {words.map((word) => (
          <div
            key={word.id}
            className={`falling-word ${word.color}`}
            style={{ top: `${word.top}%`, left: `${word.left}%` }}
          >
            {word.text}
          </div>
        ))}
      </div>

      <Row className="mt-3 align-items-center bottom-controls">
        <Col xs={9}>
          <input
            type="text"
            className="typing-input"
            value={typed}
            onChange={handleTyping}
            ref={inputRef}
            placeholder="Start typing..."
            disabled={gameEnded}
          />
        </Col>
        <Col xs={3}>
          <Button onClick={endGame} className="end-game-button">
            ❌ End Typing
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Game;
