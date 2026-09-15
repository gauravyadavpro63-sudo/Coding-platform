import mongoose from "mongoose"
import dns from "dns"
  dns.setServers([
     '1.1.1.1',  
        '8.8.8.8'
     ])

async function Main(){


  await mongoose.connect(process.env.DB_PASSWARD)


}

export default Main