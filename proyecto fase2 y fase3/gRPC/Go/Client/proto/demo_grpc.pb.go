// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package proto

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// OperacionAritmeticaClient is the client API for OperacionAritmetica service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type OperacionAritmeticaClient interface {
	OperarValores(ctx context.Context, in *OperacionRequest, opts ...grpc.CallOption) (*OperacionReply, error)
	LlenarJson(ctx context.Context, in *LlenarRequest, opts ...grpc.CallOption) (*LlenarReply, error)
}

type operacionAritmeticaClient struct {
	cc grpc.ClientConnInterface
}

func NewOperacionAritmeticaClient(cc grpc.ClientConnInterface) OperacionAritmeticaClient {
	return &operacionAritmeticaClient{cc}
}

func (c *operacionAritmeticaClient) OperarValores(ctx context.Context, in *OperacionRequest, opts ...grpc.CallOption) (*OperacionReply, error) {
	out := new(OperacionReply)
	err := c.cc.Invoke(ctx, "/helloworld.OperacionAritmetica/OperarValores", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *operacionAritmeticaClient) LlenarJson(ctx context.Context, in *LlenarRequest, opts ...grpc.CallOption) (*LlenarReply, error) {
	out := new(LlenarReply)
	err := c.cc.Invoke(ctx, "/helloworld.OperacionAritmetica/LlenarJson", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// OperacionAritmeticaServer is the server API for OperacionAritmetica service.
// All implementations must embed UnimplementedOperacionAritmeticaServer
// for forward compatibility
type OperacionAritmeticaServer interface {
	OperarValores(context.Context, *OperacionRequest) (*OperacionReply, error)
	LlenarJson(context.Context, *LlenarRequest) (*LlenarReply, error)
	mustEmbedUnimplementedOperacionAritmeticaServer()
}

// UnimplementedOperacionAritmeticaServer must be embedded to have forward compatible implementations.
type UnimplementedOperacionAritmeticaServer struct {
}

func (UnimplementedOperacionAritmeticaServer) OperarValores(context.Context, *OperacionRequest) (*OperacionReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method OperarValores not implemented")
}
func (UnimplementedOperacionAritmeticaServer) LlenarJson(context.Context, *LlenarRequest) (*LlenarReply, error) {
	return nil, status.Errorf(codes.Unimplemented, "method LlenarJson not implemented")
}
func (UnimplementedOperacionAritmeticaServer) mustEmbedUnimplementedOperacionAritmeticaServer() {}

// UnsafeOperacionAritmeticaServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to OperacionAritmeticaServer will
// result in compilation errors.
type UnsafeOperacionAritmeticaServer interface {
	mustEmbedUnimplementedOperacionAritmeticaServer()
}

func RegisterOperacionAritmeticaServer(s grpc.ServiceRegistrar, srv OperacionAritmeticaServer) {
	s.RegisterService(&OperacionAritmetica_ServiceDesc, srv)
}

func _OperacionAritmetica_OperarValores_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(OperacionRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OperacionAritmeticaServer).OperarValores(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/helloworld.OperacionAritmetica/OperarValores",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OperacionAritmeticaServer).OperarValores(ctx, req.(*OperacionRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _OperacionAritmetica_LlenarJson_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LlenarRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(OperacionAritmeticaServer).LlenarJson(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/helloworld.OperacionAritmetica/LlenarJson",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(OperacionAritmeticaServer).LlenarJson(ctx, req.(*LlenarRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// OperacionAritmetica_ServiceDesc is the grpc.ServiceDesc for OperacionAritmetica service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var OperacionAritmetica_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "helloworld.OperacionAritmetica",
	HandlerType: (*OperacionAritmeticaServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "OperarValores",
			Handler:    _OperacionAritmetica_OperarValores_Handler,
		},
		{
			MethodName: "LlenarJson",
			Handler:    _OperacionAritmetica_LlenarJson_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/demo.proto",
}