/** @jsx React.createElement */
var ChooseComponent = React.createClass({
    getInitialState: function() {
        var self = this;
        superagent.get('/choose')
        .accept('json')
        .end(function(err,res) {
            if (err) {
                console.log(err.toString());
                return;
            }

            if (res.body.hasNext) {
                self.setState({
                    processing: false,
                    name: res.body.name
                });
            } else {
                self.setState({complete: true});
            }
        });
        return {
            processing: true,
            name: ' '
        };
    },
    handleAccept: function() {
        if (this.state.processing) return;
        this.setState({ processing: true });
        this.onChoose(true);
    },
    handleReject: function() {
        if (this.state.processing) return;
        this.setState({ processing: true });
        this.onChoose(false);
    },
    onChoose: function(accept) {
        var self = this;
        superagent.post('/choose')
        .type('json')
        .accept('json')
        .send({
            accept: accept
        })
        .end(function(err,res) {
            if (err) {
                console.log(err.toString());
                return;
            }

            if (res.body.hasNext) {
                self.setState({
                    processing: false,
                    name: res.body.name
                });
            } else {
                self.setState({complete: true});
            }
        });
    },
    render: function() {
        if (this.state.complete) {
            return (<h2>No more names left to choose!</h2>);
        } else {
        return (
            <div className='text-center'>
                <h1>{this.state.name[0]+this.state.name.substr(1).toLowerCase()}</h1>
                <div>
                    <a className='btn btn-large btn-primary' onClick={this.handleAccept}>Yes</a>
                    <a className='btn btn-large' onClick={this.handleReject}>No</a>
                </div>
            </div>);
        }
    }

});
var ChooseFactory = React.createFactory(ChooseComponent);
