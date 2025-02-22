import { useSelector, useDispatch } from 'react-redux'
import { RootState } from './store/store'
import { increment, decrement } from './store/slices/exampleSlice'

export const App = () => {
  const count = useSelector((state: RootState) => state.example.count)
  const dispatch = useDispatch()

  return (
    <div>
      <h1>Redux Toolkit + Persist</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
