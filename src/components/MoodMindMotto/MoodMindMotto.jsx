import FadeContent from '../FadeContent/FadeContent';
import './MoodMindMotto.scss';

const MoodMindMotto = () => {
  return (
    <section className='mood-mind-motto'>
      <div className='mood-mind-motto__container'>
        {/* 🌟 Revelado suave al hacer scroll hasta el final */}
        <FadeContent
          duration={1}
          delay={0.2}
          direction='bottom'
        >
          <h2 className='mood-mind-motto__text'>
            <span className='mood-mind-motto__line'>NUESTRO MOOD</span>
            <span className='mood-mind-motto__line'>ES SIEMPRE</span>
            <span className='mood-mind-motto__line'>
              ESTAR AL D<span className='mood-mind-motto__highlight'>IA</span>
            </span>
          </h2>
        </FadeContent>
      </div>
    </section>
  );
};

export default MoodMindMotto;
