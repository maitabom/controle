import ContainerProperties from "./properties";

export default function Container({ children }: ContainerProperties) {
  return <main className="w-full max-w-7xl mx-auto px-2">{children}</main>;
}
