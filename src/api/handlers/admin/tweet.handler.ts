import { TweetBaseHandler } from "../base/tweetBaseHandler";
import ITweetHandler from "./interface/ITweetHandler";

class TweetHandler extends TweetBaseHandler implements ITweetHandler {}

export default new TweetHandler();
