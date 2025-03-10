import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
const Check = ({props, completed}) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G clipPath="url(#clip0_142_1148)">
      <Path
        d="M18.3386 9.23333V10C18.3376 11.797 17.7557 13.5456 16.6797 14.9849C15.6037 16.4241 14.0913 17.4771 12.3681 17.9866C10.6448 18.4961 8.80299 18.4349 7.11733 17.8122C5.43167 17.1894 3.99248 16.0384 3.0144 14.5309C2.03632 13.0234 1.57176 11.2401 1.69 9.44693C1.80824 7.6538 2.50294 5.94694 3.6705 4.58089C4.83806 3.21485 6.41592 2.26282 8.16876 1.86679C9.9216 1.47076 11.7555 1.65195 13.3969 2.38333"
        stroke={completed ? '#156B2D' : '#3e3b3b'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18.3386 3.33334L10.0052 11.675L7.50525 9.17501"
        stroke={completed ? '#156B2D' : '#3e3b3b'}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_142_1148">
        <Rect
          width={20}
          height={20}
          fill="white"
          transform="translate(0.00524902)"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Check;
