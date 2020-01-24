import Link from "next/link";
import styled from "styled-components";

interface IStyledProps{
  margin: number;
  color: string;
}

function App() {
  return (
    <div>
      Welcome to Next.js!
      <Link href='/home'>Home Page</Link>
      <Title margin={10} color="blue">This is a title with styled components</Title>
    </div>
  );
}

const Title = styled.h1<IStyledProps>`
  color: ${props => props.color};
  margin-top: ${props => `${props.margin}em`};
`;

export default App;
