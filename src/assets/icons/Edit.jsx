import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
const Edit = props => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M5 15L4.5 19.5L9 19L19.5858 8.41421C20.3668 7.63316 20.3668 6.36684 19.5858 5.58579L18.4142 4.41421C17.6332 3.63317 16.3668 3.63317 15.5858 4.41421L5 15Z"
      stroke="#3E3B3B"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14 6L18 10"
      stroke="#3E3B3B"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13 20H21"
      stroke="#3E3B3B"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default Edit;
