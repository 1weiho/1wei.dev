import Earth from './earth'
import UTC8Clock from '@/components/utc-8-clock'
import Balancer from 'react-wrap-balancer'

const Geo = () => {
  return (
    <div className="flex flex-col items-center md:mt-28 py-32 md:py-40">
      <Earth />
      <div className="max-w-[500px] text-center mt-10 md:mt-14">
        <Balancer>
          If you don’t know where Taiwan is, here’s a little reference for you,
          I live here :)
        </Balancer>
      </div>
      <UTC8Clock className="mt-6" />
    </div>
  )
}

export default Geo
