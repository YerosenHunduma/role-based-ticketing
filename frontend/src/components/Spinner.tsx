import { Component } from 'react';

export default class Spinner extends Component {
    render() {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-900"></div>
            </div>
        );
    }
}
