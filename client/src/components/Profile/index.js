import Profile from './Profile'

import { connect } from 'react-redux'
import injectSheet from 'react-jss'

import { logout } from '../../store/user/actions'

const styles = {
  profile: {
    padding: '10px',
    textAlign: 'center',
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      textAlign: 'center',
      margin: '20px 0'
    }
  },
  content: {
    padding: '10px 0 30px'
  },
  profileCard: {
    textAlign: 'initial'
  }
}

export default injectSheet(styles)(
  connect((state) => {
    return {
      profile: state.user.get('profile') ? state.user.get('profile').toJS() : null
    }
  }, { logout })(Profile)
)
