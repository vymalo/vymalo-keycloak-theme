import {Button, ButtonProps} from "./button";
import google from "../login/assets/google.png";
import facebook from "../login/assets/facebook.png";

export type SocialButtonProps = {
    loginUrl: string;
    alias: string;
    providerId: string;
    displayName: string;
} & ButtonProps<"a">;

export function SocialButton(p: SocialButtonProps) {
    const icon = p.providerId === "google" ? google : facebook;
    return (
        <Button fullWidth as='a' href={p.loginUrl} id={`zocial-${p.alias}`} className='cursor-pointer'>
            <img className='w-6' src={icon} alt={p.alias + '-logo'}/>
            <span>{p.displayName}</span>
        </Button>
    );
}