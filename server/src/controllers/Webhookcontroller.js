import {Webhook } from 'svix';
import User from '../models/User.js';

export const clerkWebhook = async (req,res)=>{

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  //get clerk webhook headers
  const  svix_id = req.headers['svix-id'];
  const svix_timestamp = req.headers['svix-timestamp'];
  const svix_signature = req.headers['svix-signature'];

  if(!svix_id || !svix_timestamp || !svix_signature){
    return res.status(400).json({message: 'Missing svix headers'});
  }

  //verify the webhook is actually from clerk
  const wh = new Webhook(WEBHOOK_SECRET);
  let event;

  try{
    event = wh.verify(req.body, {
      'svix-id': svix_id,
      'svix-timestamp':svix_timestamp,
      'svix-signature': svix_signature,
    })
  } catch(err){
    return res.status(400).json({message: 'Invalid webhook signature'})
  }

  //handle user.created event
  if(event.type == 'user.created'){
    const {id, email_addresses, first_name, last_name} = event.data;
     
    const email = email_addresses[0]?.email_address;
    const name = `${first_name || ''}  ${last_name || ''}`.trim();

    await User.create({
      clerkId : id,
      email,
      name,
      role: null,
    })
  }

  res.status(200).json({message: 'Webhook received!'});
}