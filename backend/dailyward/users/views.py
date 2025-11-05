from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserInfoSerializer
from rest_framework.response import Response
from rest_framework import status, permissions
from .utils import send_code_to_user
from .models import OneTimePassword

# Create your views here.

class RegisterUserView(GenericAPIView):
    serializer_class = UserRegisterSerializer
    permission_classes = [permissions.AllowAny] 

    def post(self, request):
        user_data = request.data
        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user = serializer.data
            send_code_to_user(user['email'])
            return Response({
                'data': user,
                'message': f'User {user["first_name"]} registered successfully. Please verify your email.'
            }, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyUserEmailView(GenericAPIView):
    permission_classes = [permissions.AllowAny] 

    def post(self, request):
        otpcode=request.data.get('otp')
        try:
            user_code_obj = OneTimePassword.objects.get(code=otpcode)
            user = user_code_obj.user
            if not user.is_verified:
                user.is_verified = True
                user.save()
                return Response({
                    'message': 'email verified successfully'
                }, status=status.HTTP_200_OK)
            return Response({
                'message': 'code is invalid: email already verified'
            }, status=status.HTTP_204_NO_CONTENT)
        except OneTimePassword.DoesNotExist:
            return Response({
                'error': 'passcode not provided or invalid'
            }, status=status.HTTP_404_NOT_FOUND)
        
class LoginUserView(GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid(raise_exception=True):
            return Response({
                'data': serializer.data,
                'message': 'login successful'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserInfoView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserInfoSerializer

    def get(self, request):
        serializer = self.serializer_class(request.user)
        return Response({
            'data': serializer.data,
            'message': 'user info retrieved successfully'
        }, status=status.HTTP_200_OK)
    
    def patch(self, request):
        serializer = self.serializer_class(
            request.user, 
            data=request.data, 
            partial=True
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({
                'data': serializer.data,
                'message': 'user info updated successfully'
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    