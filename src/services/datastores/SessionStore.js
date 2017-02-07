import BaseStore from "./BaseStore";
import { EventEmitter } from "events";
import Session from "../../models/Session";
import mongoose from "mongoose";

const ONE_DAY = 86400 * 1000;

class SessionStore extends EventEmitter {
  constructor(ttl = ONE_DAY) {
    super();
    this.ttl = ttl;
  }
  *set(sid, sess) {
    const maxAge = sess.cookie.maxAge || sess.cookie.maxage;

    sess.sid = sid;
    sess.ttl = new Date((this.ttl || (typeof maxAge === "number" ? maxAge : ONE_DAY)) + Date.now());

    let sessionDoc = yield Session.findOne({ sid: sid }).exec();
    let entity = { sid: sid, sess: sess, ttl: sess.ttl };

    if (sessionDoc === null) {
      sessionDoc = new Session(entity);
      sessionDoc = yield sessionDoc.persist();
    } else {
      sessionDoc = yield sessionDoc.update(entity);
    }

    return sessionDoc;
  }

  *get(sid, sess) {
    let doc = yield Session.findOne({ sid: sid }, { sess: 1 }).exec();
    if (doc === null) {
      return {};
    }
    return { passport: doc.sess.passport, cookie: doc.sess.cookie };
  }

  *destroy(sid) {
    yield Session.remove({ sid: sid });
  }
}

export default SessionStore;
