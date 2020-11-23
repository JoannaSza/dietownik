import React from 'react';
import { Container, Collapse } from 'reactstrap';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.footerRef = React.createRef();
    this.state = { isOpen: false };
  }

  componentDidUpdate = () => {};

  toggleHandler = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  scrollHandler = () => {
    this.footerRef.current.scrollIntoView({
      behaviour: 'smooth',
      block: 'end',
    });
  };

  render() {
    return (
      <footer
        ref={this.footerRef}
        className='border-top border-muted p-1 bg-rich-black'
        style={{ bottom: 0, width: '100%' }}
      >
        <Container className='p-0'>
          <div className='w-100 text-center'>
            <button
              className='btn badge badge-light mb-1'
              onClick={this.toggleHandler}
            >
              Show icons source{' '}
            </button>
          </div>

          <Collapse
            isOpen={this.state.isOpen}
            onEntered={this.scrollHandler}
            className='my-1'
          >
            <small className='text-muted my-1'>
              <ul className='m-0'>
                <li>
                  breakfast, dinner, supper, hot, cold: Icons made by{' '}
                  <a
                    href='https://www.flaticon.com/authors/freepik'
                    title='Freepik'
                  >
                    {' '}
                    Freepik{' '}
                  </a>
                </li>
                <li>
                  smoothie: Icons made by{' '}
                  <a
                    href='https://www.flaticon.com/authors/monkik'
                    title='monkik'
                  >
                    monkik
                  </a>
                </li>
                <li>
                  cheescake: Icons made by{' '}
                  <a
                    href='https://www.flaticon.com/authors/photo3idea-studio'
                    title='photo3idea_studio'
                  >
                    photo3idea_studio
                  </a>
                </li>
                <li>
                  soup: Icons made by{' '}
                  <a
                    href='https://www.flaticon.com/free-icon/soup_1981014'
                    title='Nhor Phai'
                  >
                    Nhor Phai
                  </a>
                </li>
              </ul>
              from{' '}
              <a href='https://www.flaticon.com/' title='Flaticon'>
                {' '}
                www.flaticon.com{' '}
              </a>
            </small>
          </Collapse>
        </Container>
        {/* Icons authors: */}
        {/* breakfast: Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* dinner: Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* supper: Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* smoothie: Icons made by <a href="https://www.flaticon.com/authors/monkik" title="monkik">monkik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* cheescake: Icons made by <a href="https://www.flaticon.com/authors/photo3idea-studio" title="photo3idea_studio">photo3idea_studio</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* soup: Icons made by <a href="https://www.flaticon.com/free-icon/soup_1981014" title="Nhor Phai">Nhor Phai</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* hot: Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
        {/* cold: Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> */}
      </footer>
    );
  }
}

export default Footer;
