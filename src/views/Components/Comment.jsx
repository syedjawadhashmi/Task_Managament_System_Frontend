import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    
  });
class Comments extends React.Component {

    render(){
        return(
            <div>Comments</div>
        )
    }
}
Comments.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Comments);
