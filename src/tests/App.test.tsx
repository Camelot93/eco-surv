import {render} from '@testing-library/react';
import App from '../App';

//NOTE
//Usually testId will need to be replaced later on in testing to have a more realisic 
//insight on user interaction. I chose testId for this assignement to increase testing performance 

it("Renders Parent component without failing", () => {
  render(<App />);
});


 


