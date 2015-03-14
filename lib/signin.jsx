/** @jsx React.createElement */
var SigninComponent = React.createClass({
    getInitialState: function() {
        return {
            username: '',
            error: false
        };
    },
    handleSignin: function() {
        var self = this;
        superagent.post('/signin')
        .type('json')
        .accept('json')
        .send({
            username: this.state.username
        })
        .end(function(err,res) {
            if (err || !res.body.success) {
                self.setState({error: true});
            } else {
                window.location.href = '/';
            }
        });
    },
    handleChange: function(e) {
        this.setState({username:e.target.value});
    },
    render: function() {
        return (
        <div>
            <span className='col-md-12'>
                <form role='form'>
                    <legend>Sign in</legend>
                    <div className={ this.state.error ? 'form-group has-error' : 'form-group' }>
                        <div className='controls'>
                            <input type='text' className='form-control' name='username' placeholder='User name' onChange={this.handleChange} value={this.state.username} />
                        </div>
                    </div>
                    <div className='form-group'>
                        <div className='controls'>
                            <button type='button' className='btn btn-primary' onClick={this.handleSignin} >Sign in</button>
                        </div>
                    </div>
                </form>
            </span>
        </div>);
    }

});
var SigninFactory = React.createFactory(SigninComponent);
