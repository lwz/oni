/**
 * WindowTitle.tsx
 *
 * Renders the title bar (OSX only)
 */

import * as React from "react"

import { connect } from "react-redux"

import { commandManager } from "./../../Services/CommandManager"
import * as State from "./../Shell/ShellState"

export interface IWindowTitleViewProps {
    visible: boolean
    title: string
    backgroundColor: string
    foregroundColor: string
}

export class WindowTitleView extends React.PureComponent<IWindowTitleViewProps, {}> {
    public render(): null | JSX.Element {
        if (!this.props.visible) {
            return null
        }

        const style: React.CSSProperties = {
            height: "22px",
            lineHeight: "22px",
            zoom: 1, // Don't allow this to be impacted by zoom
            backgroundColor: this.props.backgroundColor,
            color: this.props.foregroundColor,
            textAlign: "center",
            WebkitAppRegion: "drag",
            WebkitUserSelect: "none",
            pointerEvents: "all",
        }

        return (
            <div id={"oni-titlebar"} style={style} onDoubleClick={this.onDoubleClick}>
                {this.props.title}
            </div>
        )
    }

    private onDoubleClick() {
        commandManager.executeCommand("oni.editor.maximize")
    }
}

export interface IWindowTitleProps {
    visible: boolean
}

export const mapStateToProps = (
    state: State.IState,
    props: IWindowTitleProps,
): IWindowTitleViewProps => {
    return {
        visible: props.visible && !state.isFullScreen,
        title: state.windowTitle,
        backgroundColor: state.colors["title.background"],
        foregroundColor: state.colors["title.foreground"],
    }
}

export const WindowTitle = connect(mapStateToProps)(WindowTitleView)
