// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.23.0
// 	protoc        v3.5.1
// source: infected/infectedpb/infected.proto

package infectedpb

import (
	context "context"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// This is a compile-time assertion that a sufficiently up-to-date version
// of the legacy proto package is being used.
const _ = proto.ProtoPackageIsVersion4

type Infected struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Name         string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	Location     string `protobuf:"bytes,2,opt,name=location,proto3" json:"location,omitempty"`
	Age          int32  `protobuf:"varint,3,opt,name=age,proto3" json:"age,omitempty"`
	Infectedtype string `protobuf:"bytes,4,opt,name=infectedtype,proto3" json:"infectedtype,omitempty"`
	State        string `protobuf:"bytes,5,opt,name=state,proto3" json:"state,omitempty"`
}

func (x *Infected) Reset() {
	*x = Infected{}
	if protoimpl.UnsafeEnabled {
		mi := &file_infected_infectedpb_infected_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Infected) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Infected) ProtoMessage() {}

func (x *Infected) ProtoReflect() protoreflect.Message {
	mi := &file_infected_infectedpb_infected_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Infected.ProtoReflect.Descriptor instead.
func (*Infected) Descriptor() ([]byte, []int) {
	return file_infected_infectedpb_infected_proto_rawDescGZIP(), []int{0}
}

func (x *Infected) GetName() string {
	if x != nil {
		return x.Name
	}
	return ""
}

func (x *Infected) GetLocation() string {
	if x != nil {
		return x.Location
	}
	return ""
}

func (x *Infected) GetAge() int32 {
	if x != nil {
		return x.Age
	}
	return 0
}

func (x *Infected) GetInfectedtype() string {
	if x != nil {
		return x.Infectedtype
	}
	return ""
}

func (x *Infected) GetState() string {
	if x != nil {
		return x.State
	}
	return ""
}

type InfectedRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Infected *Infected `protobuf:"bytes,1,opt,name=infected,proto3" json:"infected,omitempty"`
}

func (x *InfectedRequest) Reset() {
	*x = InfectedRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_infected_infectedpb_infected_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *InfectedRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*InfectedRequest) ProtoMessage() {}

func (x *InfectedRequest) ProtoReflect() protoreflect.Message {
	mi := &file_infected_infectedpb_infected_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use InfectedRequest.ProtoReflect.Descriptor instead.
func (*InfectedRequest) Descriptor() ([]byte, []int) {
	return file_infected_infectedpb_infected_proto_rawDescGZIP(), []int{1}
}

func (x *InfectedRequest) GetInfected() *Infected {
	if x != nil {
		return x.Infected
	}
	return nil
}

type InfectedResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Result string `protobuf:"bytes,1,opt,name=result,proto3" json:"result,omitempty"`
}

func (x *InfectedResponse) Reset() {
	*x = InfectedResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_infected_infectedpb_infected_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *InfectedResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*InfectedResponse) ProtoMessage() {}

func (x *InfectedResponse) ProtoReflect() protoreflect.Message {
	mi := &file_infected_infectedpb_infected_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use InfectedResponse.ProtoReflect.Descriptor instead.
func (*InfectedResponse) Descriptor() ([]byte, []int) {
	return file_infected_infectedpb_infected_proto_rawDescGZIP(), []int{2}
}

func (x *InfectedResponse) GetResult() string {
	if x != nil {
		return x.Result
	}
	return ""
}

var File_infected_infectedpb_infected_proto protoreflect.FileDescriptor

var file_infected_infectedpb_infected_proto_rawDesc = []byte{
	0x0a, 0x22, 0x69, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x2f, 0x69, 0x6e, 0x66, 0x65, 0x63,
	0x74, 0x65, 0x64, 0x70, 0x62, 0x2f, 0x69, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x12, 0x08, 0x69, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x22, 0x86,
	0x01, 0x0a, 0x08, 0x49, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x12, 0x12, 0x0a, 0x04, 0x6e,
	0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04, 0x6e, 0x61, 0x6d, 0x65, 0x12,
	0x1a, 0x0a, 0x08, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x02, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x08, 0x6c, 0x6f, 0x63, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x10, 0x0a, 0x03, 0x61,
	0x67, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x05, 0x52, 0x03, 0x61, 0x67, 0x65, 0x12, 0x22, 0x0a,
	0x0c, 0x69, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x74, 0x79, 0x70, 0x65, 0x18, 0x04, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x0c, 0x69, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x74, 0x79, 0x70,
	0x65, 0x12, 0x14, 0x0a, 0x05, 0x73, 0x74, 0x61, 0x74, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x09,
	0x52, 0x05, 0x73, 0x74, 0x61, 0x74, 0x65, 0x22, 0x41, 0x0a, 0x0f, 0x49, 0x6e, 0x66, 0x65, 0x63,
	0x74, 0x65, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x2e, 0x0a, 0x08, 0x69, 0x6e,
	0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x12, 0x2e, 0x69,
	0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x2e, 0x49, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64,
	0x52, 0x08, 0x69, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x22, 0x2a, 0x0a, 0x10, 0x49, 0x6e,
	0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x16,
	0x0a, 0x06, 0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x06,
	0x72, 0x65, 0x73, 0x75, 0x6c, 0x74, 0x32, 0x56, 0x0a, 0x0f, 0x49, 0x6e, 0x66, 0x65, 0x63, 0x74,
	0x65, 0x64, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x43, 0x0a, 0x08, 0x49, 0x6e, 0x66,
	0x65, 0x63, 0x74, 0x65, 0x64, 0x12, 0x19, 0x2e, 0x69, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64,
	0x2e, 0x49, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x1a, 0x1a, 0x2e, 0x69, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x2e, 0x49, 0x6e, 0x66, 0x65,
	0x63, 0x74, 0x65, 0x64, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0x15,
	0x5a, 0x13, 0x69, 0x6e, 0x66, 0x65, 0x63, 0x74, 0x65, 0x64, 0x2f, 0x69, 0x6e, 0x66, 0x65, 0x63,
	0x74, 0x65, 0x64, 0x70, 0x62, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_infected_infectedpb_infected_proto_rawDescOnce sync.Once
	file_infected_infectedpb_infected_proto_rawDescData = file_infected_infectedpb_infected_proto_rawDesc
)

func file_infected_infectedpb_infected_proto_rawDescGZIP() []byte {
	file_infected_infectedpb_infected_proto_rawDescOnce.Do(func() {
		file_infected_infectedpb_infected_proto_rawDescData = protoimpl.X.CompressGZIP(file_infected_infectedpb_infected_proto_rawDescData)
	})
	return file_infected_infectedpb_infected_proto_rawDescData
}

var file_infected_infectedpb_infected_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_infected_infectedpb_infected_proto_goTypes = []interface{}{
	(*Infected)(nil),         // 0: infected.Infected
	(*InfectedRequest)(nil),  // 1: infected.InfectedRequest
	(*InfectedResponse)(nil), // 2: infected.InfectedResponse
}
var file_infected_infectedpb_infected_proto_depIdxs = []int32{
	0, // 0: infected.InfectedRequest.infected:type_name -> infected.Infected
	1, // 1: infected.InfectedService.Infected:input_type -> infected.InfectedRequest
	2, // 2: infected.InfectedService.Infected:output_type -> infected.InfectedResponse
	2, // [2:3] is the sub-list for method output_type
	1, // [1:2] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_infected_infectedpb_infected_proto_init() }
func file_infected_infectedpb_infected_proto_init() {
	if File_infected_infectedpb_infected_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_infected_infectedpb_infected_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Infected); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_infected_infectedpb_infected_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*InfectedRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_infected_infectedpb_infected_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*InfectedResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_infected_infectedpb_infected_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_infected_infectedpb_infected_proto_goTypes,
		DependencyIndexes: file_infected_infectedpb_infected_proto_depIdxs,
		MessageInfos:      file_infected_infectedpb_infected_proto_msgTypes,
	}.Build()
	File_infected_infectedpb_infected_proto = out.File
	file_infected_infectedpb_infected_proto_rawDesc = nil
	file_infected_infectedpb_infected_proto_goTypes = nil
	file_infected_infectedpb_infected_proto_depIdxs = nil
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConnInterface

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion6

// InfectedServiceClient is the client API for InfectedService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type InfectedServiceClient interface {
	Infected(ctx context.Context, in *InfectedRequest, opts ...grpc.CallOption) (*InfectedResponse, error)
}

type infectedServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewInfectedServiceClient(cc grpc.ClientConnInterface) InfectedServiceClient {
	return &infectedServiceClient{cc}
}

func (c *infectedServiceClient) Infected(ctx context.Context, in *InfectedRequest, opts ...grpc.CallOption) (*InfectedResponse, error) {
	out := new(InfectedResponse)
	err := c.cc.Invoke(ctx, "/infected.InfectedService/Infected", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// InfectedServiceServer is the server API for InfectedService service.
type InfectedServiceServer interface {
	Infected(context.Context, *InfectedRequest) (*InfectedResponse, error)
}

// UnimplementedInfectedServiceServer can be embedded to have forward compatible implementations.
type UnimplementedInfectedServiceServer struct {
}

func (*UnimplementedInfectedServiceServer) Infected(context.Context, *InfectedRequest) (*InfectedResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Infected not implemented")
}

func RegisterInfectedServiceServer(s *grpc.Server, srv InfectedServiceServer) {
	s.RegisterService(&_InfectedService_serviceDesc, srv)
}

func _InfectedService_Infected_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(InfectedRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(InfectedServiceServer).Infected(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/infected.InfectedService/Infected",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(InfectedServiceServer).Infected(ctx, req.(*InfectedRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _InfectedService_serviceDesc = grpc.ServiceDesc{
	ServiceName: "infected.InfectedService",
	HandlerType: (*InfectedServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Infected",
			Handler:    _InfectedService_Infected_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "infected/infectedpb/infected.proto",
}