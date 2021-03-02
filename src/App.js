import {
  SignIn,
  SignUp,
  ReIssue,
  Header,
  Nav,
  Post,
  PostEdit,
  Chat,
  ChatMessage,
  RoomEdit,
  Question,
  QuestionEdit,
  AnswerEdit,
  Analytics,
  Mission,
  MissionEdit,
  MissionSubmit,
  Collect,
  Schedule,
  MyTask,
  MyTaskEdit,
  Setting,
  ProfEdit,
  AuthEdit,
  UserDelete,
} from './script/Component/render.js'
import './script/CSS/common.css'
import './script/CSS/top.css'
import './script/CSS/header.css'
import './script/CSS/nav.css'
import Auth from './Auth'

import { Route, Switch } from 'react-router-dom'

/* ===================================================================== */

const App = () => {
  return (
    <Switch>
      <Route exact path={'/signin'} component={SignIn} />
      <Route exact path={'/signup'} component={SignUp} />
      <Route exact path={'/reissue'} component={ReIssue} />
      <Auth>
        <Header />
        <div className="flexbox-row">
          <Nav />
          <Route exact path={'/post'} component={Post} />
          <Route path={'/post/edit(/:id)?'} component={PostEdit} />

          <Route exact path={'/chat'} component={Chat} />
          <Route path={'/chat/edit(/:id)?'} component={RoomEdit} />
          <Route path={'/chat/room(/:id)?'} component={ChatMessage} />

          <Route exact path={'/question'} component={Question} />
          <Route path={'/question/edit(/:id)?'} component={QuestionEdit} />
          <Route path={'/question/answer(/:id)?'} component={AnswerEdit} />
          <Route path={'/question/analytics(/:id)?'} component={Analytics} />

          <Route exact path={'/schedule'} component={Schedule} />

          <Route exact path={'/task'} component={MyTask} />
          <Route path={'/task/edit(/:id)?'} component={MyTaskEdit} />

          <Route exact path={'/mission'} component={Mission} />
          <Route path={'/mission/edit(/:id)?'} component={MissionEdit} />
          <Route path={'/mission/submit(/:id)?'} component={MissionSubmit} />
          <Route path={'/mission/collect(/:id)?'} component={Collect} />

          <Route exact path={'/setting'} component={Setting} />
          <Route exact path={'/setting/prof'} component={ProfEdit} />
          <Route exact path={'/setting/auth'} component={AuthEdit} />
          <Route exact path={'/setting/delete'} component={UserDelete} />
        </div>
      </Auth>
    </Switch>
  )
}
export default App
