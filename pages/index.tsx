import CircularProgress from '@mui/material/CircularProgress';
import type {NextPage} from 'next'

const Home: NextPage = () => {

    return (
        <div className="flex h-screen justify-center items-center">
            <div className="text-center">
                <CircularProgress />
            </div>
        </div>
    )
}

export default Home
