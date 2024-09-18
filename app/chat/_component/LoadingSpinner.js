
import { RotatingLines } from 'react-loader-spinner';
export default function LoadingSpinner({isLoading}) {
  return (
      <RotatingLines visible={isLoading} height='96' width='96' color='grey' strokeWidth="5"
        animationDuration="0.75"/>
  )
}
